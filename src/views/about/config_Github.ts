const user = {
  // token: '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',//beta模式
  token: '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',
  name: 'lzyszds',
}
export const headers = {
  'Authorization': `bearer ${user.token}`,
}
const body = {
  "query": `query {
            user(login: "${user.name}") {
              name
              contributionsCollection {
                contributionCalendar {
                  colors
                  totalContributions
                  weeks {
                    contributionDays {
                      color
                      contributionCount
                      date
                      weekday
                    }
                    firstDay
                  }
                }
              }
            }
          }`
}
export const parps = JSON.stringify(body)
