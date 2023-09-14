import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { toogleChecked } from '../redux/filterActions'
import { filterTicketsAdd, filterTicketsDelet } from '../redux/ticketsActions'
import FilterItem from '../FilterItem'

import classes from './Filter.module.scss'

export default function Filter() {
  const dispatch = useDispatch()
  const filters = useSelector((state) => state.filter)

  const toogle = (id, checked) => {
    if (!checked) {
      dispatch(filterTicketsAdd(id))
    } else {
      dispatch(filterTicketsDelet(id))
    }
    dispatch(toogleChecked(id))
  }

  useEffect(() => {}, [filters])

  const inputList = filters.map((el) => {
    return <FilterItem key={el.value} checked={el.checked} toogle={toogle} value={el.value} id={el.id} />
  })

  return (
    <div className={classes.filter}>
      <div>Количество пересадок</div>
      <form className={classes.list}>{inputList}</form>
    </div>
  )
}
