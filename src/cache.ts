/**
 * 方法缓存装饰器，对方法取得的数据进行缓存
 * @param cacheKey 缓存的key
 * @param isArgsAffectKey 是否根据参数不同决定key不同
 */
export function cache(cacheKey: string, isArgsAffectKey: boolean = false): MethodDecorator {
  return function (target, propertyKey, descriptor) {
    const original =
      descriptor.value === void 0 ? (descriptor.get as Function) : (descriptor.value as Function)
    const getOrValue = descriptor.value === void 0 ? 'get' : 'value'
    ;(descriptor as any)[getOrValue] = function (this: any, ...args: any[]) {
      if (args.length > 0 && isArgsAffectKey) {
        const argsStr = JSON.stringify(args)
        cacheKey += argsStr
      }
      if (this.cache.has(cacheKey)) return this.cache.get(cacheKey)
      const result = original.call(this, ...args)
      this.cache.set(cacheKey, result)
      return result
    }
  }
}

export function cacheAndReturn<T = unknown>(
  key: string,
  getDataFn: () => T,
  cache: Map<string, T>
): T {
  if (cache.has(key)) return cache.get(key) as T
  const res = getDataFn()
  cache.set(key, res)
  return res
}
