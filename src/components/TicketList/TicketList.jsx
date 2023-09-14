/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Ticket from '../Ticket/Ticket'
import NotFound from '../NotFound'
import Loading from '../Loading'

import classes from './TicketList.module.scss'

export default function TicketList() {
  const { tickets, filteredTickets, isLoading } = useSelector((state) => state.tickets)
  const filters = useSelector((state) => state.filter)
  const [showedTickets, setShowedTickets] = useState([])
  const [countTickets, setCountTickets] = useState(5)
  const [isSorted, setIsSorted] = useState(false)
  const sorting = useSelector((state) => state.sort)

  useEffect(() => {
    if (!isSorted) setShowedTickets(tickets.slice(0, countTickets))
    if (isSorted) setShowedTickets(filteredTickets.slice(0, countTickets))
  }, [tickets, countTickets, filteredTickets, isSorted, sorting])

  useEffect(() => {
    const sortedOn = filters[1].checked || filters[2].checked || filters[3].checked || filters[4].checked
    const showAll =
      filters[0].checked || (!filters[1].checked && !filters[2].checked && !filters[3].checked && !filters[4].checked)
    if (sortedOn) setIsSorted(true)
    if (showAll) setIsSorted(false)
  }, [filters])

  const showMore = () => {
    setCountTickets((prev) => prev + 10)
  }
  const loading = isLoading ? <Loading /> : null
  const ticketsList =
    showedTickets.length > 0 ? showedTickets.map((el, id) => <Ticket key={id} ticket={el} />) : <NotFound />
  return (
    <>
      {loading}
      {ticketsList}
      <button className={classes.btn} type="button" onClick={showMore}>
        Показать еще
      </button>
    </>
  )
}
