import React, {useEffect, useRef, useState} from "react"
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
import {useObserver} from "../hooks/useObserver";
import MySelect from "../components/ui/select/MySelect";


function Posts() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(10)
    const lastElement = useRef()

    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page)
        setPosts([...posts, ...response.data])
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

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        fetchPosts(limit, page)
    }, [page, limit])

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
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue='Count elements on page'
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'},
                    {value: -1, name: 'All'},
                ]}
            />
            {postError &&
                <h1>Error ${postError}</h1>
            }
            <PostList
                remove={removePost}
                posts={sortedAndSearchedPosts}
                title={'Posts List'}
            />
            <div ref={lastElement} style={{height: 20, background: "red"}}>

            </div>
            {isPostsLoading &&
                <div style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
                    <Loader/>
                </div>
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
