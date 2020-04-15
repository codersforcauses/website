export const initAnalytics = (token: string) => {
  // @ts-ignore
  window.heap = window.heap || []
  // @ts-ignore
  heap.load = function(e, t) {
    // @ts-ignore
    ;(window.heap.appid = e), (window.heap.config = t = t || {})
    var r = t.forceSSL || 'https:' === document.location.protocol,
      a = document.createElement('script')
    ;(a.type = 'text/javascript'),
      (a.async = !0),
      (a.src =
        (r ? 'https:' : 'http:') +
        '//cdn.heapanalytics.com/js/heap-' +
        e +
        '.js')
    var n = document.getElementsByTagName('script')[0]
    // @ts-ignore
    n.parentNode.insertBefore(a, n)
    for (
      var o = function(e: any) {
          return function() {
            // @ts-ignore
            heap.push([e].concat(Array.prototype.slice.call(arguments, 0)))
          }
        },
        p = [
          'addEventProperties',
          'addUserProperties',
          'clearEventProperties',
          'identify',
          'resetIdentity',
          'removeEventProperty',
          'setEventProperties',
          'track',
          'unsetEventProperty',
        ],
        c = 0;
      c < p.length;
      c++
    )
      // @ts-ignore
      heap[p[c]] = o(p[c])
  }
  // @ts-ignore
  heap.load(token)
}
