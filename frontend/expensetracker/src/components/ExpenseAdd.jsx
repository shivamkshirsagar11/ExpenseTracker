import React from 'react'
export default function ExpenseAdd() {
  return (
    <div class="eadd">
    <section className="content">
        <h3 className="secondTitle">Add a new item: </h3>
        <div className="form">
            <form id="expForm">
                <div className="formLine left">
                    <span for="type">Type:</span>
                    <select id="type">
                        <option value="chooseOne">Choose one...</option>
                        <option value="Card">Card</option>
                        <option value="Cash">Cash</option>
                        <option value="Cryptocoin">Cryptocoin</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="formLine right">
                    <span for="name">Name:</span>
                    <input type="text" id="name"/>
                </div>

                <div className="formLine left">
                    <span for="date">Date:</span>
                    <input type="date" id="date"/>
                </div>
                <div className="formLine right">
                    <span for="amount">Amount:</span>
                    <input type="text" id="amount"/>
                </div>
                <button type="submit" className="buttonSave">Add a new expense</button>
            </form>
        </div>
    </section>
    </div>
  )
}
