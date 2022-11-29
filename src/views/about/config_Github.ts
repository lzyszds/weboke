const user = {
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
