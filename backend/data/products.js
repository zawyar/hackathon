const products = [
    {
        _id: '1',
        name: 'Valorant',
        image: '/images/valorant.jpg',
        description:
            'Valorant is a free-to-play first-person hero shooter developed and published by Riot Games, for Microsoft Windows. First teased under the codename Project A in October 2019, the game began a closed beta period with limited access on April 7, 2020, followed by an official release on June 2, 2020.',
        brand: 'Riot Games',
        category: 'Tactical Shooter',
        price: 89.99,
        countInStock: 10,
        rating: 4.5,
        numReviews: 12,
    },
    {
        _id: '2',
        name: 'Fortnite',
        image: '/images/fortnite.jpg',
        description:
            'Fortnite is an online video game developed by Epic Games and released in 2017. It is available in three distinct game mode versions that otherwise share the same general gameplay and game engine',
        brand: 'Epic Games',
        category: 'FPS',
        price: 56.99,
        countInStock: 7,
        rating: 4.0,
        numReviews: 8,
    },
    {
        _id: '3',
        name: 'Subway Surfers',
        image: '/images/subway-surfers.jpg',
        description:
            'Subway Surfers is an endless runner mobile game co-developed by Kiloo and SYBO Games, private companies based in Denmark. It is available on Android, iOS, Kindle, and Windows Phone platforms and uses the Unity game engine.',
        brand: 'SYBO',
        category: 'Platformer',
        price: 9.99,
        countInStock: 5,
        rating: 3,
        numReviews: 12,
    },
];
module.exports = products;
