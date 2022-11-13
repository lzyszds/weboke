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
