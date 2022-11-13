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
