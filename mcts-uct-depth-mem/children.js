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
    constructor(childrenToClone)
    {
      this.cache = childrenToClone ? new Set(childrenToClone.cache) : new Set();
      this.capacity = SETUP.CHILDREN_CAPACITY_PER_NODE;
    }

    get(key) 
    {
        if (!this.cache.has(key)) return undefined;

        const child = key;
        this.cache.delete(key);
        this.cache.add(child);
        return child;
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
