// src/components/Feed.jsx
import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

const Feed = () => {
  const [posts, setPosts] = useState([])

  // 🔹 Fetch existing posts on mount
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('id, content, tags, created_at')
        .order('created_at', { ascending: false })
        .limit(10)

      if (error) {
        console.error('❌ Error fetching posts:', error)
      } else {
        console.log('✅ Fetched posts:', data)
        setPosts(data)
      }
    }

    fetchPosts()
  }, [])

  // 🔸 Real-time subscription for INSERTs
  useEffect(() => {
    console.log('🔁 Subscribing to Supabase real-time events...')

    const channel = supabase
      .channel('realtime:posts')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'posts' },
        (payload) => {
          console.log('📡 New real-time event received:', payload)
          setPosts((prev) => [payload.new, ...prev])
        }
      )
      .subscribe((status) => {
        console.log('🛰 Realtime channel status:', status)
      })

    return () => {
      console.log('❌ Unsubscribing from real-time channel')
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Latest Posts</h2>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="p-3 mb-3 rounded bg-gray-100">
            <p className="text-lg">{post.content}</p>
            {post.tags && (
              <p className="text-sm text-gray-600 mt-1">
                Tags: {post.tags.join(', ')}
              </p>
            )}
            <p className="text-xs text-gray-400">
              {new Date(post.created_at).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  )
}

export default React.memo(Feed)
