import * as React from 'react';
import {
  Children,
  Dispatch,
  Fragment,
  ReactElement,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { CustomRoutes, CustomRoutesProps } from '../components/CustomRoutes';
import { Resource, ResourceProps } from '../components/Resource';
import { useMenuStore } from '../store/menu';
import { useSafeSetState } from './useSafeState';

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

  useRegisterMenu(routesAndResources);

  return {
    customRoutesWithLayout: routesAndResources.customRoutesWithLayout,
    customRoutesWithoutLayout: routesAndResources.customRoutesWithoutLayout,
    resources: routesAndResources.resources,
    components: routesAndResources.components,
  };
};

function useRegisterMenu(routesAndResources: RoutesAndResources) {
  const { resources } = routesAndResources;

  useEffect(() => {
    resources.forEach((resource) => {
      useMenuStore.getState().addMenu({
        key: resource.props.name,
        label: resource.props.label ?? resource.props.name,
        icon: resource.props.icon,
      });
    });

    return () => {
      resources.forEach((resource) => {
        useMenuStore.getState().removeMenu(resource.props.name);
      });
    };
  }, [resources]);
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
      setRoutesAndResources((previous) => ({
        customRoutesWithLayout: [
          ...previous.customRoutesWithLayout,
          newRoutesAndResources.customRoutesWithLayout,
        ],
        customRoutesWithoutLayout: [
          ...previous.customRoutesWithoutLayout,
          newRoutesAndResources.customRoutesWithoutLayout,
        ],
        resources: [...previous.resources, newRoutesAndResources.resources],
        components: [...previous.components, newRoutesAndResources.components],
      }));
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

    if (element.type === CustomRoutes) {
      const customRoutesElement = element as ReactElement<CustomRoutesProps>;

      if (customRoutesElement.props.noLayout) {
        customRoutesWithoutLayout.push(customRoutesElement.props.children);
      } else {
        customRoutesWithLayout.push(customRoutesElement.props.children);
      }
    } else if (element.type === Resource) {
      resources.push(element as ReactElement<ResourceProps>);
    } else {
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
  customRoutesWithLayout: ReactElement<CustomRoutesProps>[];
  customRoutesWithoutLayout: ReactElement<CustomRoutesProps>[];
  resources: ReactElement<ResourceProps>[];
  components: ReactElement[];
};

type AdminRouterStatus = 'loading' | 'empty' | 'ready';
