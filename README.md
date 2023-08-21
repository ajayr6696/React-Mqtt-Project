# React-Node.js-Project
A simple Manual / Automatic Scheduler project using React for Frontend and Node.js and Express.js for getting Data

A single page ReactJS app to assist in scheduling. Single page app look like the
following.

Schedule

Monday Tuesday Wednesday Thursday Friday
Morning UpStairs X X X X X
Morning Down Stairs X X X X X
Morning Parking Lot X X X X X
Lunch A X X X X X
Lunch B X X X X X
Lunch C X X X X X
Lunch D X X X X X
Afternoon Up Stairs X X X X X
Afternoon Down Stairs X X X X X
Afternoon Parking Lot X X X X X

Load

Staff Member Monday Tuesday Wednesday Thursday Friday Totals
X1 Y Y Y Y Y YY
X2 Y Y Y Y Y YY
X3 Y Y Y Y Y YY
X4 Y Y Y Y Y YY
X5 Y Y Y Y Y YY
X6 Y Y Y Y Y YY
X7 Y Y Y Y Y YY

For the Schedule section, fields labelled X allow display and selection of a staff member for a
time slot / shift
There are seven staff members, their names are X1, X2, X3, X4, X5, X6 and X7.
In the Load section, each staff member is listed (X1..X7). Fields labelled Y are that staff
members’ ‘load’ for that day. Their load is the number of shifts worked on that day. Fields
labelled YY are the total number of shifts allocated to staff member in the week.
Quality of code, documentation, tests and functionality are what ISARA is interested in seeing.
ISARA appreciates that your personal time is valuable – please do not spend more than 2 hours
total working on this challenge. The following table describes features breaking this single page
app into functional blocks. Not all levels need to be addressed. Addressed levels should be
attempted in numerical order though.

# Level Features

1. Server serves a ReactJS page which is static, but similar in shape to the above.
Components are preferred a single render function building everything.
2. ReactJS page where each X above is replaced with some HTML control allowing a staff
member to be selected for a slot.
3. ReactJS page displays all staff in the Load section, with their number of slots correct
for each day, and the correct total for the week
4. ReactJS page prevents – or displays warning – when a staff member is in consecutive
lunch slots on the same day.
5. ReactJS page prevents – or displays warning – when a staff member has more than 2
shifts per day
6. ReactJS page prevents – or displays warning – when a staff member has more than 7
shifts per week
7. ReactJS page prevents – or displays warning – when a staff member is selected to be
in two places at once. (eg: UpStairs and Parking Lot)
8. ReactJS page allows randomised population of currently empty shifts, respecting the
above rules. At this level, clearing all shifts should be supported too.
9. ReactJS page reports how many staff members are needed to fill all shifts, respecting
the above rules.
10. ReactJS page stores current progress at the server (globally)
11. ReactJS page can retrieve current state when re-opened (globally)
12. ReactJS page supports undo/redo
