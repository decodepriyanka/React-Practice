import { useState } from 'react';
import './styles.css'

const CheckboxesData = [
  {
    id: 1,
    label: "Fruits",
    children: [
      { id: 2, label: "Apple" },
      { id: 3, label: "Banana" },
      {
        id: 4,
        label: "Citrus",
        children: [
          { id: 5, label: "Orange" },
          { id: 6, label: "Lemon" },
        ],
      },
    ],
  },
  {
    id: 7,
    label: "Vegetables",
    children: [
      { id: 8, label: "Carrot" },
      { id: 9, label: "Broccoli" },
    ],
  },
];


const Checkboxes = ({ data, checked, setChecked }) => {
  const handleChange = (isChecked, node) => {
    setChecked((prev) => {
      const newState = { ...prev, [node.id]: isChecked }
      //if children are present add all of them to newstate
      const updateChildren = (node) => {
        node.children?.forEach((child) => {
          newState[child.id] = isChecked
          child.children && updateChildren(child)
        })
      }
      updateChildren(node)
      //if all children are checked mark parent as checked
      const verifyChecked = (node) => {
        if (!node.children) return newState[node.id] || false
        //return boolean
        const allChildrenChecked = node.children.every((child) => verifyChecked(child))
        newState[node.id] = allChildrenChecked
        return allChildrenChecked

      }
      // for each node call this function
      CheckboxesData.forEach((node) => verifyChecked(node))
      return newState
    })
  }
  console.log(checked)
  return (
    <div>
      {data.map((node) => (
        <div key={node.id} className="parent">
          <input type="checkbox" checked={checked[node.id]} onChange={(e) => handleChange(e.target.checked, node)} />
          <span>{node.label}</span>
          {node.children && <Checkboxes data={node.children} checked={checked} setChecked={setChecked} />}
        </div>
      ))}
    </div>
  );
};

export default function NestedCheckbox() {
  const [checked, setChecked] = useState({})
  return (
    <div>
      <h2>Nested Checkbox</h2>
      <Checkboxes
        data={CheckboxesData}
        checked={checked}
        setChecked={setChecked}
      />
    </div>
  );
}
