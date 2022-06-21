module.exports = {
    purge: [
        // './src/**/*.html',
        // './src/**/*.js',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            //宽高大小
            spacing: {
                '88': '11rem',
                '100': '25rem',
                '108': '27rem',
                '128': '32rem',
                '144': '36rem',
                '100px': '100px',
                '425px': '425px',
                'content': '64.8%',
            },
            // 定位top,left等值
            inset: {
                '0': 0,
                '18': '4.5rem',
                // ...
                '64': '16rem',
                '1/5': '20%',
            },
            //最小宽度
            minWidth: {
                '0': '0',
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%',
                'full': '100%',
                '425px': '425px',
                '100px': '100px',
            },
            //边框颜色自定义
            borderColor: theme => ({
                ...theme('colors'),
                DEFAULT: theme('colors.gray.300', 'currentColor'),
                'primary': '#3490dc',
                'secondary': '#ffed4a',
                'danger': '#e3342f',
                '#FE9600': '#FE9600'
            }),
            //圆角
            borderRadius: {
                '4xl': '2rem',
            },
            // 自定义颜色
            colors: {
                'theme': '#666666'
            },
            // 自定义字体
            fontFamily: {
                'douyu': ['douyu', 'douyu'],
            },
            //自定义字体颜色
            textColor: {
                'primary': '#3490dc',
                'secondary': '#ffed4a',
                'danger': '#e3342f',
                'aquamarine': 'aquamarine',
                '#FE9600': '#FE9600'
            }
        },
        boxShadow: {
            sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
            "top": ' 0px -7px 15px -13px rgba(0, 0, 0, 0.3) ',
            "bottom": ' 0px 5px 15px -13px rgba(0, 0, 0, 0.3) ',
            "right": ' 5px 8px 15px 0px rgba(0,0,0,1) ',
            inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
            outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
            focus: '0 0 0 3px rgba(66, 153, 225, 0.5)',
            image: '2px 2px 3px #e1e1e1', //头像阴影 悬空感
            none: 'none',
        },
        fontSize: {
            'xs': '.75rem',
            'sm': '.875rem',
            'tiny': '.875rem',
            'base': '1rem',
            'lg': '1.125rem',
            'xl': '1.25rem',
            '1.5xl': '1.375rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem',
            '5xl': '3rem',
            '6xl': '4rem',
            '7xl': '5rem',
        },
        backgroundColor: theme => ({
            ...theme('colors'),
            'primary': '#3490dc',
            'secondary': '#ffed4a',
            'danger': '#e3342f',
            '#F1F3F4': "#F1F3F4",
            'aquamarine': 'aquamarine'
        }),
    },
    variants: {},
    plugins: [],
}