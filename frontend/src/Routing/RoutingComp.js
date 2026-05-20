import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

const RoutingComp = () => {
    const params = useParams();//path parameter
    const [URLSearchParam,setURLSearchParam]=useSearchParams();// query parameter
  return (
    <div>
      Routing Component
      <h1>Route Params - {JSON.stringify(params)}</h1>
      <h1>Search Params - {URLSearchParam.get('search')} {URLSearchParam.get('capacities')}</h1>
      <input type="search" placeholder='search query' onChange={e=>setURLSearchParam({'mobile':e.target.value,'capacity':'256gb'})}/>
    </div>
  )
}

export default RoutingComp
