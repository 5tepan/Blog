import React from 'react'
import MyInput from "./ui/input/MyInput"
import MySelect from "./ui/select/MySelect"

const PostFilter = ({filter, setFilter}) => {
    return (
        <div>
            <MyInput
                value={filter.query}
                onChange={e => setFilter({...filter, query: e.target.value})}
                placeholder="Search..."
            />
            <MySelect
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                defaultValue={"Sort for"}
                options={[
                    {value: 'title', name: 'For title'},
                    {value: 'body', name: 'For body'}
                ]}
            />
        </div>
    )
}

export default PostFilter