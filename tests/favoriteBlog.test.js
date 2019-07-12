const favoriteBlog = require('../utils/list_helper').favoriteBlog;

describe('favoriteBlog', () => {
    test('of a list of one blog is that blog', () => {
        expect(favoriteBlog(
            [
                {
                    title: 'A blog post',
                    author: 'Nikos',
                    url: 'a url',
                    likes: 15
                }
            ]
        )).toEqual({
            title: 'A blog post',
            author: 'Nikos',
            url: 'a url',
            likes: 15
        });
    });

    test('of a list of many blogs is the one with the most likes', () => {
        expect(favoriteBlog(
            [
                {
                    title: 'A blog post',
                    author: 'Nikos',
                    url: 'a url',
                    likes: 15
                },
                {
                    title: 'Another blog post',
                    author: 'Georgia',
                    url: 'another url',
                    likes: 150
                },
                {
                    title: 'Yet another blog post',
                    author: 'George',
                    url: 'yet another url',
                    likes: 155
                }
            ]
        )).toEqual({
            title: 'Yet another blog post',
            author: 'George',
            url: 'yet another url',
            likes: 155
        });
    });

    test('of a list of many blogs with the same #likes is the first one of those posts', () => {
        expect(favoriteBlog(
            [
                {
                    title: 'A blog post',
                    author: 'Nikos',
                    url: 'a url',
                    likes: 15
                },
                {
                    title: 'Another blog post',
                    author: 'Georgia',
                    url: 'another url',
                    likes: 150
                },
                {
                    title: 'Yet another blog post',
                    author: 'George',
                    url: 'yet another url',
                    likes: 150
                }
            ]
        )).toEqual({
            title: 'Another blog post',
            author: 'Georgia',
            url: 'another url',
            likes: 150
        });
    });
});