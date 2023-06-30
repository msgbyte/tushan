export function transToMongoId(input: any) {
  if (typeof input !== 'string') {
    return '_id';
  }

  if (input === 'id') {
    return '_id';
  }

  return input;
}

export function virtualId<T extends { _id: string }>(
  arr: T[]
): Array<T & { id: string }>;
export function virtualId<T extends { _id: string }>(
  doc: T
): T & { id: string };
export function virtualId<T extends { _id: string }>(el: Array<T> | T) {
  if (Array.isArray(el)) {
    return el.map((e) => {
      return {
        id: e._id,
        ...e,
        _id: undefined,
      };
    });
  }

  return { id: el._id, ...el, _id: undefined };
}

export function convertId<T extends Record<string, unknown>>(obj: T) {
  if (obj.id) {
    const newObject = {
      _id: obj.id,
      ...obj,
    };

    delete newObject.id;
    return newObject;
  } else {
    return obj;
  }
}

export function transToLafOrder(input: any) {
  if (input === 'ASC') {
    return 'asc' as const;
  }

  return 'desc' as const;
}
