import { useState, useEffect } from 'react'
import { API } from 'aws-amplify'
import { listPosts } from '../src/graphql/queries'
import Link from 'next/link'

export default function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetchPosts()
    })

    async function fetchPosts() {
        const postData = await API.graphql({
            query: listPosts,
        })
        setPosts(postData.data.listPosts.items)
    }

    return (
        <div>
            <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-8">
                My Posts
            </h1>
            {posts.map((post, index) => (
                <Link key={index} href={`/posts/${post.id}`} passHref>
                    <div className="my-6 pb-6 border-b border-gray-300">
                        <h2 className="text-xl font-semibold">{post.title}</h2>
                        <p className="text-gray-500 mt-2">
                            Author: {post.username}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    )
}
