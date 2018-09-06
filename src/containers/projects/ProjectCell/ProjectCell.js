import React from 'react'
import css from './ProjectCell.css'

const ProjectCell = (props) => {
   return (
        <div className={css.ProjectCell} onClick={props.clicked}>
            <p className={css.ProjectName}>{props.proj.name}</p>
            <p className={css.ProjectCost}>{props.proj.income}</p>
        </div>
    )   
}

export default ProjectCell
