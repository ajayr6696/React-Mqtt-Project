import './App.css';
import React, { useState, useEffect } from 'react';
// import axios from "axios";

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const periods = [
  { name: 'Morning Up Stairs', type: 'morning' },
  { name: 'Morning Down Stairs', type: 'morning' },
  { name: 'Morning Parking Lot', type: 'morning' },
  { name: 'Lunch A', type: 'lunch-a' },
  { name: 'Lunch B', type: 'lunch-b' },
  { name: 'Lunch C', type: 'lunch-c' },
  { name: 'Lunch D', type: 'lunch-d' },
  { name: 'Afternoon Up Stairs', type: 'afternoon' },
  { name: 'Afternoon Down Stairs', type: 'afternoon' },
  { name: 'Afternoon Parking Lot', type: 'afternoon' },
];

const Staff = [
  { id: 'X1', name: 'X1' },
  { id: 'X2', name: 'X2' },
  { id: 'X3', name: 'X3' },
  { id: 'X4', name: 'X4' },
  { id: 'X5', name: 'X5' },
  { id: 'X6', name: 'X6' },
  { id: 'X7', name: 'X7' },
];

const initialState = {
  schedule: {},
  load: {},
};


for (const day of days) {
  for (const period of periods) {
    initialState.schedule[`${day}-${period.name}`] = null;
  }
}

for (const staff of Staff) {
  initialState.load[staff.id] = {
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    total: 0,
  };
}

function App() {
  const [state, setState] = useState(initialState);
  console.log(state);

  // Code to get data from backend. Data must be loaded from backend whenever page is rendered.
  // Imported axios and useEffect to get data from 
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const scheduleRes = await axios.get(`/schedules`);
  //       const staffRes = await axios.get(`/staffs`);
  //       const periodeRes = await axios.get(`/periods`);
           // Change the format accordingly and set to state
  //       setPosts(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchData();
  // }, [cat]);
  // console.log(state.load);
  // Inputs to set a schedule
  // const [inputs, setInputs] = useState({
  //   day: "",
  //   period: "",
  //   staff: "",
  // });

  const isConsecutiveLunch = (slotKey, staffMember, schedule) => {
    const updatedSchedule = typeof schedule !== 'undefined' ? {...schedule, [slotKey]: staffMember} : {...state.schedule, [slotKey]: staffMember};
    const day = slotKey.split('-')[0];
    const periodNames = periods.filter((period) => period.type.startsWith('lunch')).map((period) => period.name);
    for (let i = 0; i < periodNames.length - 1; i++) {
      const currentSlot = `${day}-${periodNames[i]}`;
      const nextSlot = `${day}-${periodNames[i + 1]}`;
      if (updatedSchedule[currentSlot] && updatedSchedule[nextSlot] && updatedSchedule[currentSlot] === updatedSchedule[nextSlot]) {
        return true;
      }
    }
    return false;
  };

  const isMaxDay = (staffMember, day) => {
    const staffLoad = state.load[staffMember][day];
    return staffLoad >= 2;
  };

  const isMaxWeek = (staffMember) => {
    const staffLoad = state.load[staffMember].total;
    return staffLoad >= 7;
  };

  const conflictingSlotKey = (slotKey,staffMember,schedule) => {
    const updatedSchedule =  typeof schedule !== 'undefined' ? {...schedule, [slotKey]: staffMember} :{...state.schedule, [slotKey]: staffMember};
    const [day,periodName] = slotKey.split('-');
    const filteredScedule = Object.entries(updatedSchedule).filter(
      ([key, value]) => key.split('-')[0]===day 
      && periods.find((period) => period.name === key.split('-')[1]).type  === periods.find((period) => period.name === periodName).type 
      && value === staffMember
      );
      return filteredScedule.length > 1;
  };

  function randomizeSchedule() {
    const updatedSchedule = { ...state.schedule };
    const updatedLoad = { ...state.load };
    
    // Get all the empty shifts
    const emptyShifts = Object.entries(updatedSchedule).filter(
      ([key, value]) => value === null
    );
    
    // Randomly assign staff to each empty shift
    emptyShifts.forEach(([key, value]) => {
      const [day, period] = key.split("-");
      const availableStaff = Staff.map(staff1 => staff1.id).filter((staff) => {
        const staffLoad = updatedLoad[staff];
        return (
          staffLoad[day] < 2 &&
          staffLoad.total < 7 &&
          !isConsecutiveLunch(key, staff, updatedSchedule) &&
          !conflictingSlotKey(key, staff, updatedSchedule)
        );
      });
      if (availableStaff.length > 0) {
        const selectedStaff =
          availableStaff[Math.floor(Math.random() * availableStaff.length)];
        updatedSchedule[key] = selectedStaff;
        updatedLoad[selectedStaff][day]++;
        updatedLoad[selectedStaff].total++;
      }
    });
    setState({ ...state, schedule: updatedSchedule, load: updatedLoad });
  };
  
  // Code to check for minimum number of staffs required to cover all shifts. 
  // It is just the idea. Not working.
  // const calculateStaffRequired = () => {
  //   const maxConsecutiveLunchSlots = 1;
  //   const maxShiftsPerDay = 2;
  //   const maxShiftsPerWeek = 7;
  
  //   let staffLoad = {};
  //   let staffRequired = {};
  //   for (const staff of Staff) {
  //     staffLoad[staff.id] = {
  //       Monday: 0,
  //       Tuesday: 0,
  //       Wednesday: 0,
  //       Thursday: 0,
  //       Friday: 0,
  //       total: 0,
  //     };
  //     staffRequired[staff.id] = 0;
  //   }
  
  //   for (const day of days) {
  //     for (const period of periods) {
  //       const shiftStaff = state.schedule[`${day}-${period.name}`];
  //       if (shiftStaff) {
  //         const currentStaffLoad = staffLoad[shiftStaff][day];
  //         const currentStaffTotalLoad = staffLoad[shiftStaff].total;
  
  //         // check for consecutive lunch slots
  //         if (
  //           period.type === "lunch-a" ||
  //           period.type === "lunch-b" ||
  //           period.type === "lunch-c" ||
  //           period.type === "lunch-d"
  //         ) {
  //           const previousPeriod = periods[periods.indexOf(period) - 1];
  //           const nextPeriod = periods[periods.indexOf(period) + 1];
  //           const previousShiftStaff = state.schedule[`${day}-${previousPeriod.name}`];
  //           const nextShiftStaff = state.schedule[`${day}-${nextPeriod.name}`];
  //           if (
  //             (previousShiftStaff && previousShiftStaff === shiftStaff) ||
  //             (nextShiftStaff && nextShiftStaff === shiftStaff)
  //           ) {
  //             // staff member is in consecutive lunch slots
  //             console.warn(`${shiftStaff} has consecutive lunch slots on ${day}`);
  //           }
  //         }
  
  //         // check for max shifts per day
  //         if (currentStaffLoad >= maxShiftsPerDay) {
  //           // staff member already has maximum number of shifts for this day
  //           console.warn(`${shiftStaff} has already reached the maximum number of shifts on ${day}`);
  //         }
  
  //         // check for max shifts per week
  //         if (currentStaffTotalLoad >= maxShiftsPerWeek) {
  //           // staff member already has maximum number of shifts for this week
  //           console.warn(`${shiftStaff} has already reached the maximum number of shifts this week`);
  //         }
  
  //         // check for staff member already assigned to another shift in this time slot
  //         const otherShift = periods.find((p) => p.name !== period.name && p.type === period.type);
  //         const otherShiftStaff = state.schedule[`${day}-${otherShift.name}`];
  //         if (otherShiftStaff && otherShiftStaff !== shiftStaff) {
  //           // staff member is assigned to two places at once
  //           console.warn(`${shiftStaff} is assigned to two places at once on ${day} ${period.name} and ${otherShift.name}`);
  //         }
  
  //         // update staff load and total load
  //         staffLoad[shiftStaff][day]++;
  //         staffLoad[shiftStaff].total++;
  //       }
  //     }
  //   }
  
  //   // calculate required staff for each day
  //   for (const day of days) {
  //     const dayShifts = periods.filter((p) => p.name.includes(day));
  //     let required = 0;
  //     for (const period of dayShifts) {
  //       const shiftStaff = state.schedule[`${day}-${period.name}`];
  //       if (!shiftStaff) {
  //         required++;
  //       }
  //     }
  //     staffRequired[day] = required;
  //   }
  
  //   // calculate total required staff
  //   let totalRequired = 0;
  //   for (const day of days) {
  //     totalRequired += staffRequired[day];
  //   }
    
  //   // calculate excess staff for each staff member
  //   for (const staff of Staff) {
  //   const staffExcess = staffLoad[staff.id].total - maxShiftsPerWeek;
  //   if (staffExcess > 0) {
  //   console.warn(`${staff.id} has worked ${staffExcess} too many shifts this week`);
  //   }
  //   }
    
  //   // return staff required
  //   return totalRequired;
  // };
 
  
  function handleSlotChange(slotKey, staffMember) {
  const [day, periodName] = slotKey.split('-');
  const currentStaffMember = state.schedule[slotKey];

  // Check if staff member is already assigned to the selected slot
  if (currentStaffMember === staffMember) {
    return;
  }

  if(staffMember === "")
  {
    console.log("Deleting task for the user")
  }

  // Check if staff member is assigned to a consecutive lunch slot
  if (staffMember && periodName.startsWith('Lunch') && isConsecutiveLunch(slotKey, staffMember)) {
    alert(`Staff member cannot be assigned to consecutive lunch slots`);
    return;
  }

  // Check if staff member is assigned to more than 2 slots on the same day
  if (staffMember && isMaxDay(staffMember, day)) {
    alert(`Staff member already assigned to maximum number of slots for ${day}`);
    return;
  }

  // Check if staff member is assigned to more than 7 slots in a week
  if (staffMember && isMaxWeek(staffMember)) {
    alert(`Staff member already assigned to maximum number of slots for the week`);
    return;
  }

  //Check if the staff member is already assigned to a different slot in the same period
  if (staffMember && conflictingSlotKey(slotKey, staffMember)) {
    alert(`Staff member already assigned to another place at this time`);
    return;
  }

  setState((prevState) => {
    const currentStaffMember = prevState.schedule[slotKey];
    //if staff is null, we are deleting the user and decreasing the count of current user
    if (!staffMember) {
      return {
        ...prevState,
        schedule: { ...prevState.schedule, [slotKey]: "" },// user set to null
        load: {
          ...prevState.load,
          ...(currentStaffMember
            ? {
              [currentStaffMember]: {
                ...prevState.load[currentStaffMember],
                [day]: prevState.load[currentStaffMember][day] - 1,
                total: prevState.load[currentStaffMember].total - 1,
              },
            }
            : {}),
        },
      };
    }// If staff is being changed then decrease count of currentuser and increase count of the selected user
    return {
      ...prevState,
      schedule: { ...prevState.schedule, [slotKey]: staffMember },// user changed to selected user
      load: {
        ...prevState.load,
        [staffMember]: {
          ...prevState.load[staffMember],
          [day]: prevState.load[staffMember][day] + 1,
          total: prevState.load[staffMember].total + 1,
        },
        ...(currentStaffMember // If there is an user already  assigned, then their count is reduced, else nothing is done
          ? {
            [currentStaffMember]: {
              ...prevState.load[currentStaffMember],
              [day]: prevState.load[currentStaffMember][day] - 1,
              total: prevState.load[currentStaffMember].total - 1,
            },
          }
          : {}),
      },
    };
  });
  // To send the input to backend
//   setInputs({day: day,
  //   period: periodName,
  //   staff: staffMember,})
//   try {
//     await axios.post("/addSchedules", inputs);
//   } catch (err) {
//     setError(err.response.data);
//   }
// };
}

const clearValues = () =>{
  for (const day of days) {
    for (const period of periods) {
      initialState.schedule[`${day}-${period.name}`] = null;
    }
  }
  
  for (const staff of Staff) {
    initialState.load[staff.id] = {
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      total: 0,
    };
  }
  setState(initialState);
};
  return (
    <div>
    <h1>Schedule</h1>
    <table>
      <thead>
        <tr>
          <th></th>
          {days.map((day) => (
            <th key={day}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {periods.map((period) => (
          <tr key={period.name}>
            <td>{period.name}</td>
              {days.map((day) => (
                <td key={`${period.name}-${day}`}>
                  <select
                  value={state.schedule[`${day}-${period.name}`] }
                  onChange={(event) => handleSlotChange(`${day}-${period.name}`, event.target.value)}
                  >
                    <option value=""></option>
                    {Staff.map((staff) => (
                      <option key={staff.id} value={staff.id}>{staff.name}</option>
                    ))}
                  </select>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    <RandomizeButton randomizeSchedule={randomizeSchedule} />
    <button onClick={clearValues}>
      Clear Schedule
    </button>
    <h1>Load</h1>
    <table>
      <thead>
        <tr>
          <th>Staff Member</th>
          {days.map(day => <th key={day}>{day}</th>)}
          <th>Totals</th>
        </tr>
      </thead>
      <tbody>
        {Staff.map(staff => (
          <tr key={staff.id}>
            <td>{staff.name}</td>
            {days.map(day => (
              <td key={day}>{state.load[staff.id][day]}</td>
            ))}
            <td>{state.load[staff.id].total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}
// Button snet to ReactDOM as a function
function RandomizeButton(props) {
  return (
    <button onClick={props.randomizeSchedule}>
      Randomize Schedule
    </button>
  );
}

export default App;