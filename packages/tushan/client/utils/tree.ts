type SimpleTreeNode = { children?: SimpleTreeNode[] };

/**
 * DFS
 */
export function findTreeNode<T extends SimpleTreeNode>(
  tree: T[],
  selector: (node: T) => boolean
): T | null {
  for (const item of tree) {
    if (selector(item)) {
      return item;
    }

    if (item.children && Array.isArray(item.children)) {
      const finded = findTreeNode(item.children as any, selector);

      if (finded) {
        return finded;
      }
    }
  }

  return null;
}
