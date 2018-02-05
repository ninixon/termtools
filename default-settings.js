module.exports = function (data) {
    const minBat = 18

    const gitBranchFX = { color: 'white', bgColor: 'gray', bold: false }

    if (data.GIT_STATUS != -1) {
        switch (data.GIT_STATUS) {
            case 0: {
                // NO_CHANGES_COLOR
                gitBranchFX.bgColor = 'gray'
                gitBranchFX.color = 'black'
                break
            }
            case 1: {
                // COMMITS_AHEAD_OR_BEHIND
                gitBranchFX.bgColor = '#0b0'
                gitBranchFX.color = 'black'
                break
            }
            case 2: {
                // UNTRACKED_CHANGES_COLOR
                gitBranchFX.bgColor = '#f90'
                gitBranchFX.color = 'black'
                break
            }
            case 3: {
                // CHANGES_TO_BE_COMMITTED
                gitBranchFX.color = 'black'
                gitBranchFX.bgColor = '#aa5'
                break
            }
            case 4: {
                // LOCAL_AND_UNTRACKED_CHANGES_COLOR
                gitBranchFX.color = 'white'
                gitBranchFX.bgColor = 'red'
                break
            }
            case 5: {
                // LOCAL_CHANGES_COLOR
                gitBranchFX.color = 'black'
                gitBranchFX.bgColor = 'yellow'
                break
            }
        }
    }

    return {
        aliases: {
            foo: "echo baz",
            baz: "echo bar",
        },
        decorators: {
            pathSeparator: '  ',
            section: ''
        },
        ps1: {
            parts: {
                battery: { enabled: /* !data.IS_CHARGING && */ data.BATTERY < minBat },
                time: { enabled: false },
                userName: { enabled: true },
                string: { enabled: false, content: 'OMG :o ' },
                machine: { enabled: data.IS_TTY },
                path: { enabled: true, ellipsis: 5, cut: 'left', maxLength: 40 },
                basename: { enabled: true },
                git: { enabled: data.GIT_BRANCH },
                entry: { enabled: true, content: data.IS_ROOT ? ' # ' :  ' $ ' },
                readOnly: { enabled: !data.IS_WRITABLE },
            },
            effects: {
                userName: { color: 'white', bgColor: data.IS_ROOT ? 'redBright' : '#00f', bold: data.IS_ROOT, italic: false, underline: false , dim: false},
                machine: { color: 'black', bgColor: 'white', bold: false, italic: false, underline: false, dim: false},
                time: { color: false, bgColor: false, bold: false, italic: false, underline: false, dim: true},
                path: { color: 'white', bgColor: 'gray', bold: false, italic: false, underline: false, dim: !data.IS_ROOT },
                basename: { color: 'black', bgColor: 'white', bold: false, italic: false, underline: false, dim: false},
                entry: { color: 'white', bgColor: data.IS_ROOT ? 'redBright' : '#00f', bold: false, italic: false, underline: false, dim: false},
                readOnly: { color: 'black', bgColor: 'yellow', bold: false, italic: false, underline: false, dim: false},
                git: gitBranchFX,
                battery: {
                    color: data.IS_CHARGING && data.BATTERY >= minBat? 'gray': 'white',
                    bgColor: data.BATTERY < minBat ? 'red' : data.IS_CHARGING ? 'greenBright' : false,
                    bold: false, italic: false, underline: false, dim: false},
            }
        }
    }
}
