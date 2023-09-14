import React from 'react'

import classes from './FilterItem.module.scss'

export default function FilterItem({ checked, toogle, value, id }) {
  return (
    <label className={classes.listItem}>
      <input className={classes.checkbox} type="checkbox" checked={checked} onChange={() => toogle(id, checked)} />
      <span>{value}</span>
    </label>
  )
}
