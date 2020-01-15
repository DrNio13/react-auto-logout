import React, { useEffect, useRef } from 'react';

function App() {
  const sessionOnInit = useRef({ expiredAt: Date.now() + 20 * 1000 })
  const threshold = 10 * 1000
  const refreshThreshold = 3 * 1000
  const counter = useRef(1)
  const lastActivityAtMs = useRef(Date.now())
  const lastRefreshMs = useRef(Date.now())

  useEffect(() => {
    document.addEventListener('click', () => {
      counter.current = 0
      lastActivityAtMs.current = Date.now()
    })

    setInterval(() => {
      counter.current++

      if (Date.now() >= sessionOnInit.current.expiredAt) {
        console.log('logout')
        window.location.reload()
      }

      if ((lastActivityAtMs.current < sessionOnInit.current.expiredAt) && (Date.now() < sessionOnInit.current.expiredAt)) {
        console.log(`active no need to refresh...`)
      }

      if ((lastActivityAtMs.current - refreshThreshold > lastRefreshMs.current)) {
        console.log(`refresh...`)
        lastRefreshMs.current = Date.now()
        sessionOnInit.current = { expiredAt: Date.now() + 20 * 1000 }
      }

      if ((lastActivityAtMs.current >= sessionOnInit.current.expiredAt - threshold) || (Date.now() >= sessionOnInit.current.expiredAt - threshold)) {
        console.log(`respond within ${threshold}ms`)
      }

    }, 1000)
  }, [])

  return (
    <div className="App">

    </div>
  );
}

export default App;
