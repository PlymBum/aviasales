/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Ticket from '../Ticket/Ticket'
import NotFound from '../NotFound'

import classes from './TicketList.module.scss'

export default function TicketList() {
  const { tickets, filteredTickets } = useSelector((state) => state.tickets)
  const { all, one, two, three, without } = useSelector((state) => state.filter)
  const [showedTickets, setShowedTickets] = useState([])
  const [countTickets, setCountTickets] = useState(5)
  const [isSorted, setIsSorted] = useState(false)
  const sorting = useSelector((state) => state.sort)

  useEffect(() => {
    console.log(filteredTickets)
    if (!isSorted) setShowedTickets(tickets.slice(0, countTickets))
    if (isSorted) setShowedTickets(filteredTickets.slice(0, countTickets))
  }, [tickets, countTickets, filteredTickets, isSorted, sorting])

  useEffect(() => {
    if (one || two || three || without) setIsSorted(true)

    if (all) setIsSorted(false)
  }, [one, two, three, without, all])

  const showMore = () => {
    setCountTickets((prev) => prev + 10)
  }

  const ticketsList =
    showedTickets.length > 0 ? showedTickets.map((el, id) => <Ticket key={id} ticket={el} />) : <NotFound />
  return (
    <>
      {ticketsList}
      <button className={classes.btn} type="button" onClick={showMore}>
        Показать еще
      </button>
    </>
  )
}
