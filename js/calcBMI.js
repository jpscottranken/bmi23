/*
 *
 *	Body mass index (a.k.a. BMI) is a measure
 * 	of body fat. It is commonly used within the
 *	health industry to determine whether your
 *	weight is healthy for your height.
 *
 *	The BMI formula (inches and pounds is):
 *	BMI = (weight_in_lbs / (height * height)) * 703
 *
 *  For this program, we are assuming the following:
 *
 *  min height: 12 inches   max height:  96 inches
 *  min weight:  1 pound    max weight: 777 pounds
 *
 *	The BMI weight status chart is shown below:
 *
 *	BMI						Weight Status
 *	=====================================
 *	<  18.5					Underweight
 *	>= 18.5 && < 25.0		Optimal Weight
 *	>= 25.0 && < 30.0		Overweight
 *	>= 30.0					Obese
 *
 */

$(document).ready(function () {
  const MINHEIGHT = 12
  const MAXHEIGHT = 96
  const MINWEIGHT = 1
  const MAXWEIGHT = 777
  const MINOPTIMAL = 18.5
  const MINOVER = 25.0
  const MINOBESE = 30.0
  let isValid = true
  let theStatus = ""
  let theResult = ""
  let elem = ""

  function heightError() {
    $("#height").next().text("*")
  }

  function weightError() {
    $("#weight").next().text("*")
  }

  function calculate() {
    let height = parseInt($("#height").val())
    let weight = parseInt($("#weight").val())
    isValid = validateHeight(height)

    if (isValid) {
      isValid = validateWeight(weight)
    } else {
      return
    }

    if (isValid) {
      let bmi = calculateTheBMI(height, weight)
      $("#result").val(bmi)
      //alert("The calculated BMI is: " + bmi)
      setTheBMIStatus(bmi)
      setTheBMIPicture()
    } else {
      return
    }
  }

  function validateHeight(h) {
    let retVal = true

    if (isNaN(h) || h < MINHEIGHT || h > MAXHEIGHT) {
      $("#height")
        .next()
        .text(`A height between ${MINHEIGHT} and ${MAXHEIGHT} is required.`)
      setTimeout(heightError, 5000)
      $("#height").val("")
      document.getElementById("height").focus()
      retVal = false
    } else {
      $("#height").next().text("")
    }

    return retVal
  }

  function validateWeight(w) {
    let retVal = true

    if (isNaN(w) || w < MINWEIGHT || w > MAXWEIGHT) {
      $("#weight")
        .next()
        .text(`A weight between ${MINWEIGHT} and ${MAXWEIGHT} is required.`)
      setTimeout(weightError, 5000)
      $("#weight").val("")
      document.getElementById("weight").focus()
      retVal = false
    } else {
      $("#weight").next().text("")
    }

    return retVal
  }

  function calculateTheBMI(h, w) {
    return ((w * 703) / (h * h)).toFixed(2)
  }

  function setTheBMIStatus(bmi) {
    if (bmi < MINOPTIMAL) {
      theStatus = "Underweight"
    } else if (bmi >= MINOPTIMAL && bmi < MINOVER) {
      theStatus = "Optimal Weight"
    } else if (bmi >= MINOVER && bmi < MINOBESE) {
      theStatus = "Overweight"
    } else {
      theStatus = "Obese"
    }

    $("#status").val(theStatus)
  }

  function setTheBMIPicture() {
    elem = document.createElement("img")

    $("#weightStatusPicture").empty()

    switch (theStatus) {
      case "Underweight":
        elem.setAttribute("src", "images/underweight.png")
        break

      case "Optimal Weight":
        elem.setAttribute("src", "images/optimalweight.png")
        break

      case "Overweight":
        elem.setAttribute("src", "images/overweight.png")
        break

      case "Obese":
        elem.setAttribute("src", "images/obese.png")
        break

      default:
        elem.setAttribute("src", "images/available.png")
        break
    }

    document.getElementById("weightStatusPicture").appendChild(elem)
  }

  function clearAll() {
    document.getElementById("weightStatusPicture").removeChild(elem)
    weight = $("#height").val(" ")
    height = $("#weight").val(" ")
    theResult = $("#result").val(" ")
    theStatus = $("#status").val(" ")
    $("#weight").next().text("*")
    $("#height").next().text("*")
    $("#result").next().text("*")
    $("#status").next().text("*")
  }

  $("#calculate").click(function (evt) {
    evt.preventDefault()

    //	Call function to calculate the BMI
    calculate()

    //	Call function to set the BMI status
    //setTheBMIStatus()

    //  Call function to set the BMI picture
    //setTheBMIPicture()
  }) //calculate on click

  $("#clear").click(function () {
    clearAll()
  }) //clear on click
}) // end ready
