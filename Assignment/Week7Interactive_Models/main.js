var dataset = [80, 100, 5, 120]
var fileUploaded = false

var svgWidth = 600,
  svgHeight = 600,
  barPadding = 5
var barWidth = svgWidth / dataset.length

class Member {
  constructor (
    ID,
    Name,
    Born,
    LocationOfBirth,
    Died,
    AgeAtDeath,
    CasueOfDeath,
    LocationOfDeath,
    ImageURL
  ) {
    this.ID = ID
    this.Name = Name
    this.Born = Born
    this.LocationOfBirth = LocationOfBirth
    this.Died = Died
    this.AgeAtDeath = AgeAtDeath
    this.CasueOfDeath = CasueOfDeath
    this.LocationOfDeath = LocationOfDeath
    this.ImageUrl = ImageURL
  }
}

// var svg = d3
//   .select('svg')
//   .attr('width', svgWidth)
//   .attr('height', svgHeight)
//   .attr('class', 'svg-container')
//   .append('g')
//   .attr('transform', 'transform(50,50)')

// var barChart = svg
//   .selectAll('rect')
//   .data(dataset)
//   .enter()
//   .append('rect')
//   .attr('y', function (d) {
//     return svgHeight - d
//   })
//   .attr('height', function (d) {
//     return d
//   })
//   .attr('width', barWidth - barPadding)
//   .attr('transform', function (d, i) {
//     var translate = [barWidth * i, 0]
//     return 'translate(' + translate + ')'
//   })

let AllMemberList = []
let MemberDisplayList = []

// var Allcard = d3
//   .select('.MemberCard')
//   .attr('class', 'svg-container')
//   .attr('width', '500')
//   .attr('height', '500')
//   .append('g')

var data = d3.csv('Tsar_Famil_Member_Data01.csv').then(function (data) {
  let a = data.length
  for (i = 0; i < a; i++) {
    let d = data[i]
    let a = new Member(
      d.id,
      d.Name,
      d.Born,
      d['Location of Birth'],
      d.Died,
      d['Age at death'],
      d['Casue of death'],
      d['Location of death'],
      d.imageurl
    )
    AllMemberList.push(a)
  }
  console.log(AllMemberList)
  SortByNameAlphabet()
  //SortByNumber()
})

function SortByNameAlphabet (SortRule) {
  AllMemberList.sort(function (a, b) {
    if (a[SortRule] < b[SortRule]) {
      return -1
    }
    if (a[SortRule] > b[SortRule]) {
      return 1
    }
    return 0
  })
  removeOldCards()
  DrawCards()
}

function SortByNumber (SortRule) {
  AllMemberList.sort(function (a, b) {
    if (a[SortRule] < b[SortRule]) {
      return 1
    }
    if (a[SortRule] > b[SortRule]) {
      return -1
    }
    return 0
  })
  removeOldCards()
  DrawCards()
}

function DrawCards () {
  let CardHolders = document.getElementById('CardsHolder')

  for (i = 0; i < AllMemberList.length; i++) {
    let newCard = document.createElement('div')
    newCard.classList.add('MemberCard')
    CardHolders.appendChild(newCard)

    var img = document.createElement('img')
    if (AllMemberList[i].ImageUrl) {
      img.src = AllMemberList[i].ImageUrl
      img.classList.add('MemberImage')
      newCard.appendChild(img)
    }

    let Name = document.createElement('div')
    Name.innerText = AllMemberList[i].Name
    Name.classList.add('Name')
    newCard.appendChild(Name)

    let Born = document.createElement('div')
    Born.innerText = 'Born ' + AllMemberList[i].Born
    newCard.appendChild(Born)

    let LocationOfBirth = document.createElement('div')
    LocationOfBirth.innerText =
      'Place of Birth: ' + AllMemberList[i].LocationOfBirth
    newCard.appendChild(LocationOfBirth)

    let Died = document.createElement('div')
    Died.innerText = 'Died ' + AllMemberList[i].Died
    newCard.appendChild(Died)

    let PlaceOfDeath = document.createElement('div')
    PlaceOfDeath.innerText =
      'Place of Death: ' + AllMemberList[i].LocationOfDeath
    newCard.appendChild(PlaceOfDeath)

    let CauseofDeath = document.createElement('div')
    CauseofDeath.innerText = 'Cause of Death: ' + AllMemberList[i].CasueOfDeath
    newCard.appendChild(CauseofDeath)
  }
}

function removeOldCards () {
  let CardHolders = document.getElementById('CardsHolder')
  while (CardHolders.firstChild) {
    CardHolders.removeChild(CardHolders.firstChild)
  }
}
