import React from 'react'
import ShelfTemplate from './index'

export default function booksReadList() {
    return (
        <div>
            <ShelfTemplate 
                shelfUrl = 'booksRead'
                header="Books Finshed"
            />
        </div>
    )
}
