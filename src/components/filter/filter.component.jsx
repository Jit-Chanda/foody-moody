import React, {Component} from 'react';
import './filter.styles.css';

class Filter extends Component {
    render() {
        return(
            <div className="filter">
                <div className="filter-result">{this.props.count} Products</div>
                <div className="filter-category">Filter Category {" "}
                    <select value={this.props.category} onChange={this.props.filterCategory}>
                        <option value="">All</option>
                        <option value="cat1">cat1</option>
                        <option value="cat2">cat2</option>
                        <option value="cat3">cat3</option>
                    </select>
                </div>
            </div>
        )
    }
}

export default Filter;

