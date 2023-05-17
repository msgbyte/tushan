import * as React from 'react';
import {
  Children,
  Dispatch,
  Fragment,
  ReactElement,
  ReactNode,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import { CustomRoute, CustomRoutesProp } from '../components/CustomRoute';
import { Resource, ResourceProps } from '../components/Resource';
import { useMenuStore } from '../store/menu';
import { useWatch } from './useWatch';

/**
 * This hook inspects the CoreAdminRouter children and returns them separated in three groups:
 * - Custom routes without layout
 * - Custom routes with layout
 * - Resources
 *
 * It also returns a status:
 * - loading: still loading children from a function child
 * - empty: no resources were provided among children
 * - ready: admin is ready to be rendered
 *
 * @example
 * const {
 *    customRoutesWithLayout,
 *    customRoutesWithoutLayout,
 *    resources,
 *    status,
 * } = useConfigureAdminRouterFromChildren(children);
 */
export const useConfigureAdminRouterFromChildren = (
  children: ReactNode
): RoutesAndResources => {
  // Whenever children are updated, update our custom routes and resources
  const routesAndResources = useRoutesAndResourcesFromChildren(children);

  useRegisterMenu(routesAndResources.resources);
  useRegisterMenu(
    routesAndResources.customRoutesWithLayout,
    (item) => item.props.noMenu !== true
  );

  return {
    customRoutesWithLayout: routesAndResources.customRoutesWithLayout,
    customRoutesWithoutLayout: routesAndResources.customRoutesWithoutLayout,
    resources: routesAndResources.resources,
    components: routesAndResources.components,
  };
};

function useRegisterMenu<
  T extends ReactElement<Pick<CustomRoutesProp, 'name' | 'label' | 'icon'>>
>(routes: T[], filterFn: (item: T) => boolean = () => true) {
  useWatch([routes], () => {
    const filteredRoutes = routes.filter(filterFn);

    filteredRoutes.forEach((route) => {
      useMenuStore.getState().addMenu({
        key: route.props.name,
        label: route.props.label,
        icon: route.props.icon,
      });
    });

    return () => {
      filteredRoutes.forEach((route) => {
        useMenuStore.getState().removeMenu(route.props.name);
      });
    };
  });
}

const useRoutesAndResourcesFromChildren = (
  children: ReactNode
): RoutesAndResources => {
  const [routesAndResources] = useRoutesAndResourcesState(
    getRoutesAndResourceFromNodes(children)
  );

  return routesAndResources;
};

/*
 * A hook that store the routes and resources just like setState but also provides an additional function
 * to merge new routes and resources with the existing ones.
 */
const useRoutesAndResourcesState = (
  initialState: RoutesAndResources
): [
  RoutesAndResources,
  Dispatch<SetStateAction<RoutesAndResources>>,
  (newRoutesAndResources: RoutesAndResources) => void
] => {
  const [routesAndResources, setRoutesAndResources] = useState(initialState);

  const mergeRoutesAndResources = useCallback(
    (newRoutesAndResources: RoutesAndResources) => {
      setRoutesAndResources(
        (previous) =>
          ({
            customRoutesWithLayout: [
              ...previous.customRoutesWithLayout,
              newRoutesAndResources.customRoutesWithLayout,
            ],
            customRoutesWithoutLayout: [
              ...previous.customRoutesWithoutLayout,
              newRoutesAndResources.customRoutesWithoutLayout,
            ],
            resources: [...previous.resources, newRoutesAndResources.resources],
            components: [
              ...previous.components,
              newRoutesAndResources.components,
            ],
          } as RoutesAndResources)
      );
    },
    []
  );

  return [routesAndResources, setRoutesAndResources, mergeRoutesAndResources];
};

/**
 * Inspect the children and return an object with the following keys:
 * - customRoutesWithLayout: an array of the custom routes to render inside the layout
 * - customRoutesWithoutLayout: an array of custom routes to render outside the layout
 * - resources: an array of resources elements
 */
const getRoutesAndResourceFromNodes = (
  children: ReactNode
): RoutesAndResources => {
  const customRoutesWithLayout: React.ReactElement[] = [];
  const customRoutesWithoutLayout: React.ReactElement[] = [];
  const resources: React.ReactElement[] = [];
  const components: React.ReactElement[] = [];

  Children.forEach(children, (element) => {
    if (!React.isValidElement(element)) {
      // Ignore non-elements. This allows people to more easily inline
      // conditionals in their route config.
      return;
    }

    if (element.type === Fragment) {
      const customRoutesFromFragment = getRoutesAndResourceFromNodes(
        element.props.children
      );
      customRoutesWithLayout.push(
        ...customRoutesFromFragment.customRoutesWithLayout
      );
      customRoutesWithoutLayout.push(
        ...customRoutesFromFragment.customRoutesWithoutLayout
      );
      resources.push(...customRoutesFromFragment.resources);
      components.push(...customRoutesFromFragment.components);
    }

    if (element.type === CustomRoute) {
      const customRouteElement = element as ReactElement<CustomRoutesProp>;

      if (customRouteElement.props.noLayout) {
        customRoutesWithoutLayout.push(customRouteElement);
      } else {
        customRoutesWithLayout.push(customRouteElement);
      }
    } else if (element.type === Resource) {
      resources.push(element as ReactElement<ResourceProps>);
    } else {
      // Fallback
      components.push(element);
    }
  });

  return {
    customRoutesWithLayout,
    customRoutesWithoutLayout,
    resources,
    components,
  };
};

type RoutesAndResources = {
  customRoutesWithLayout: ReactElement<CustomRoutesProp>[];
  customRoutesWithoutLayout: ReactElement<CustomRoutesProp>[];
  resources: ReactElement<ResourceProps>[];
  components: ReactElement[];
};

type AdminRouterStatus = 'loading' | 'empty' | 'ready';
