const totalLikes = require('../utils/list_helper').totalLikes;

describe('totalLikes', () => {
    test('of one post are the likes of the post itself', () => {
        expect(totalLikes(
            [
                {
                    title: 'A blog post',
                    author: 'Nikos',
                    url: 'a url',
                    likes: 12
                }
            ]
        )).toBe(12);
    });

    test('of many posts are the sum of likes of all the posts', () => {
        expect(totalLikes(
            [
                {
                    title: 'A blog post',
                    author: 'Nikos',
                    url: 'a url',
                    likes: 12
                },
                {
                    title: 'A blog post',
                    author: 'Nikos',
                    url: 'a url',
                    likes: 15
                },
                {
                    title: 'A blog post',
                    author: 'Nikos',
                    url: 'a url',
                    likes: 100
                }
            ]
        )).toBe(127);
    });

    test('no posts to be 0', () => {
        expect(totalLikes([])).toBe(0);
    });
});