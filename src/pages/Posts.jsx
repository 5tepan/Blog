import React, {useEffect, useState} from "react"
import "../styles/App.css"
import {usePosts} from "../hooks/usePosts"
import PostService from "../api/PostService"
import {useFetching} from "../hooks/useFetching"
import {getPageCount} from "../utils/Pages"
import MyButton from "../components/ui/button/MyButton"
import MyModal from "../components/ui/modal/MyModal"
import PostForm from "../components/PostForm"
import PostFilter from "../components/PostFilter"
import Loader from "../components/ui/loader/Loader"
import PostList from "../components/PostList"
import Pagination from "../components/ui/pagination/Pagination"


function Posts() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(10)

    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page)
        setPosts(response.data)
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    })

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    useEffect(() => {
        fetchPosts()
    }, [page])

    const changePage = (page) => {
        setPage(page)
    }

    return (
        <div className="App">
            <MyButton style={{marginTop: "10px"}} onClick={() => setModal(true)}>
                Create a new post
            </MyButton>
            <MyModal
                visible={modal}
                setVisible={setModal}
            >
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: "15px 0"}} />
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            {postError &&
                <h1>Error ${postError}</h1>
            }
            {isPostsLoading
                ? <div style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
                    <Loader/>
                </div>
                : <PostList
                    remove={removePost}
                    posts={sortedAndSearchedPosts}
                    title={'Posts List'}
                />
            }
            <Pagination
                page={page}
                totalPages={totalPages}
                changePage={changePage}
            />
        </div>
    )
}

export default Posts
