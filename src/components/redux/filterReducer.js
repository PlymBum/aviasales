const initState = [
  { value: 'Все', checked: false, id: 'ALL' },
  { value: 'Без пересадок', checked: false, id: 'WITHOUT' },
  { value: '1 пересадка', checked: false, id: 'ONE' },
  { value: '2 пересадки', checked: false, id: 'TWO' },
  { value: '3 пересадки', checked: false, id: 'THREE' },
]

function filterReducer(state = initState, actions = {}) {
  switch (actions.type) {
    case 'TOOGLE_CHECKED': {
      if (actions.filter === 'ALL') {
        const isAllChecked = state[1].checked && state[2].checked && state[3].checked && state[4].checked
        const allCheckedArr = state.map((el) => {
          return isAllChecked ? { ...el, checked: false } : { ...el, checked: true }
        })
        return allCheckedArr
      }

      const idx = state.findIndex((el) => el.id === actions.filter)
      const editingFilter = { ...state[idx] }

      const newArr = [
        ...state.slice(0, idx),
        { ...editingFilter, checked: !editingFilter.checked },
        ...state.slice(idx + 1),
      ]

      const isAllCheckedNew = newArr[1].checked && newArr[2].checked && newArr[3].checked && newArr[4].checked

      return [{ ...newArr[0], checked: isAllCheckedNew }, ...newArr.slice(1)]
    }

    default:
      return state
  }
}
export default filterReducer
