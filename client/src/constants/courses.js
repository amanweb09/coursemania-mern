export const courses = [
    {
        _id: '01',
        title: 'React.js Course',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png',
        desc: 'This is the best react course on the planet',
        price: 799,
        rating: 5,
        category: 'tech',
        instructor: {
            name: 'Aman Khanna',
            profilePicture: ''
        },
        details: ['react hooks', 'state management with redux'],
        length: '10h',
        modules: [
            {
                title: 'Basics',
                content: [
                    { vid: 'v1', title: 'what is react?' },
                    { vid: 'v2', title: 'installation' }
                ]
            },
            {
                title: 'Folder structure',
                content: [
                    { vid: 'v3', title: 'Understanding files' },
                    { vid: 'v4', title: 'modules' }
                ]
            },
        ]
    },
    // {
    //     _id: '02',
    //     title: 'Ui/UX Design',
    //     image: 'https://cdn-icons-png.flaticon.com/512/91/91012.png',
    //     desc: 'Figma and Adobe XD',
    //     price: 499,
    //     rating: 4,
    //     category: 'tech',
    //     instructor: {
    //         name: 'John Doe',
    //         profilePicture: ''
    //     },
    //     details: ['prototyping', 'wireframing'],
    //     length: '10h',
    //     modules: [
    //         {
    //             title: 'Basics',
    //             content: [
    //                 { vid: 'v5', title: 'what is ui?' },
    //                 { vid: 'v6', title: 'what is ux' }
    //             ]
    //         },
    //         {
    //             title: 'tools for ui/ux',
    //             content: [
    //                 { vid: 'v7', title: 'Understanding tools' },
    //                 { vid: 'v8', title: 'Usage' }
    //             ]
    //         },
    //     ]
    // },
    {
        _id: '03',
        title: 'Python: Basic to Advanced',
        image: 'https://cdn3d.iconscout.com/3d/free/thumb/python-language-logo-6563563-5453026.png',
        desc: 'Python course from zero to hero in a month',
        price: 699,
        rating: 4,
        category: 'tech',
        instructor: {
            name: 'Swante Pablo',
            profilePicture: ''
        },
        details: ['basics', 'django'],
        length: '10h',
        modules: [
            {
                title: 'Basics',
                content: [
                    { vid: 'v9', title: 'What is python?' },
                    { vid: 'v10', title: 'Installation' }
                ]
            },
            {
                title: 'Folder structure',
                content: [
                    { vid: 'v11', title: 'Understanding files' },
                    { vid: 'v12', title: 'modules' }
                ]
            },
        ]
    },
    {
        _id: '04',
        title: 'Amazon FBA',
        image: '/images/amazon.png',
        desc: 'Best Amazon FBA course on the planet',
        price: 599,
        rating: 3,
        category: 'business',
        instructor: {
            name: 'Jeff Bezoz',
            profilePicture: ''
        },
        details: ['selecting items', 'shipping'],
        length: '10h',
        modules: [
            {
                title: 'Basics',
                content: [
                    { vid: 'v13', title: 'what is FBA?' },
                    { vid: 'v14', title: 'Why do it?' }
                ]
            },
            {
                title: 'Setting up Account',
                content: [
                    { vid: 'v15', title: 'Setting up account' },
                ]
            },
        ]
    }
]