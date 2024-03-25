import { SETUP } from "../setup.js";

/* 
This is an LRU cache for Node children. 
The Least Recently Used child is deleted upon reaching max capacity.
This data structure, combined with a depth limit, is a simple way to cap memory use.

Based on Sean Welsh Brown's implementation.
Source: https://dev.to/seanwelshbrown/implement-a-simple-lru-cache-in-javascript-4o92
*/ 

export class Children 
{
    constructor(depth, childrenToClone = null)
    {
      this.cache = childrenToClone ? new Set(childrenToClone.cache) : new Set();
      this.capacity = initCapacity(depth);
    }

    get(key) 
    {
        if (!this.cache.has(key)) return undefined;

        this.cache.delete(key);
        this.cache.add(key);
        return key;
    }

    put(key) 
    {
        this.cache.delete(key);
    
        if (this.cache.size === this.capacity) {
          this.cache.delete(this.cache.keys().next().value);
          this.cache.add(key);
        } else {
          this.cache.add(key);
        }
    }
}

function initCapacity (depth)
{
  if (depth === 1)
  {
    return SETUP.PUCT_ROOT_DEPTH_1_CHILD_CAPACITY;
  }
  else if (depth === 2)
  {
    return SETUP.PUCT_NODE_DEPTH_2_CHILD_CAPACITY;
  }
  else
  {
    return SETUP.PUCT_NODE_GENERAL_CHILD_CAPACITY;
  }
} 
