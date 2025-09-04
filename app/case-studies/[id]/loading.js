import Loader from '@/components/Loader';
import React from 'react'

const loading = () => {
    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <Loader />
        </div>
    )
}


export default loading;