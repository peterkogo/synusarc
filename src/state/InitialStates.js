function setCookie (cname, cvalue, exdays) {
  const d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  const expires = `expires=${d.toUTCString()}`
  document.cookie = `${cname}=${cvalue};${expires};path=/`
}

function getCookie (cname) {
  const name = `${cname}=`
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

// const index = 0

export function getConsoleState () {
  // const firstVisit = (getCookie('firstVisit') === 'true')
  const firstVisit = false
  // index++
  // console.log(index)
  // setCookie('firstVisit', true, 90)
  return {
    elements: [
      {
        type: 'line',
        text: 'execute ./synusarc',
        typed: firstVisit,
        userInput: !firstVisit,
        delay: (firstVisit) ? 1000 : 0,
        key: 1
      },
      {
        type: 'loading',
        maxPercent: 40,
        delay: (firstVisit) ? 2200 : 0,
        key: 2
      },
      {
        type: 'line',
        text: 'fatal error: still under construction',
        delay: (firstVisit) ? 4000 : 0,
        key: 3
      },
      {
        type: 'line',
        text: 'please contact universal admin for poetic inquiries // bitte kontaktieren sie den universalen admin für poetische anfragen aller art',
        delay: (firstVisit) ? 5000 : 0,
        key: 4
      },
      {
        type: 'line',
        text: 'synus.arc@posteo.org',
        delay: (firstVisit) ? 5000 : 0,
        key: 5
      },
      {
        type: 'image',
        imagePath: '/images/console/banner.txt',
        delay: (firstVisit) ? 7000 : 0,
        key: 6
      },
      {
        type: 'image',
        imagePath: '/images/console/banner.txt',
        delay: (firstVisit) ? 7000 : 0,
        key: 6
      },
      {
        type: 'image',
        imagePath: '/images/console/banner.txt',
        delay: (firstVisit) ? 7000 : 0,
        key: 6
      },
      {
        type: 'image',
        imagePath: '/images/console/banner.txt',
        delay: (firstVisit) ? 7000 : 0,
        key: 6
      },
      {
        type: 'image',
        imagePath: '/images/console/banner.txt',
        delay: (firstVisit) ? 7000 : 0,
        key: 6
      },
      {
        type: 'image',
        imagePath: '/images/console/banner.txt',
        delay: (firstVisit) ? 7000 : 0,
        key: 6
      },
      {
        type: 'image',
        imagePath: '/images/console/banner.txt',
        delay: (firstVisit) ? 7000 : 0,
        key: 6
      }
    ]
  }
}

export const browserState = {
  width: 0,
  height: 0
}

export function getNextState () {
  return {}
}
