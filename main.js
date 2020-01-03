const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'Tu te reveille dans une fôret et apperçois un morceau de métal brillant.',
    options: [
      {
        text: 'Prendre le morceau de métal',
        setState: { métal: true },
        nextText: 2
      },
      {
        text: 'Le laisser',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'Tu commence à explorer les alentours et tu tombe sur un marchand',
    options: [
      {
        text: 'Echanger le morceau de métal contre un kunaï',
        requiredState: (currentState) => currentState.métal,
        setState: { métal: false, kunai: true },
        nextText: 3
      },
      {
        text: 'Echanger le morceau de métal contre un parchemin',
        requiredState: (currentState) => currentState.métal,
        setState: { métal: false, parchemin: true },
        nextText: 3
      },
      {
        text: 'Ignorer le marchand',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'Après avoir quitté le marchand tu t aventure encore plus loins et apperçois une ville',
    options: [
      {
        text: 'Explorer la ville',
        nextText: 4
      },
      {
        text: 'Trouver une auberge ou passer la nuit',
        nextText: 5
      },
      {
        text: 'Tu décide de dormir dehors sur une vieille couverture qui jonche le sol',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'En explorant la ville tu tombe sur un groupe de malfrat vêtus de noir et de rouge, ils te confrontent et dans le feu de l action du trébuche et meurs',
    options: [
      {
        text: 'Recommencer',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'Sans aucun sous en poche du décide de rentrer par effraction dans une chambre. Tu termine en prison après que le propriétaire ai appelé la garde',
    options: [
      {
        text: 'Recommencer',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'Tu te réveille avec un mal de dos et une odeur douteuse mais requinqué et en vie.',
    options: [
      {
        text: 'Explorer la ville',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'En explorant la ville tu tombe nez à nez avec une bande de voyous.',
    options: [
      {
        text: 'Courir',
        nextText: 8
      },
      {
        text: 'Les attaquer avec ton Kunai',
        requiredState: (currentState) => currentState.kunai,
        nextText: 9
      },
      {
        text: 'Utiliser la technique de ton parchemin',
        requiredState: (currentState) => currentState.parchemin,
        nextText: 10
      },
      {
        text: 'Leurs donner le morceau de métal',
        requiredState: (currentState) => currentState.métal,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Tu es trop lent, les voyous sont encore plus énervés et te tabassent.',
    options: [
      {
        text: 'Recommencer',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'Les voyous te désarment et te passent un tabac',
    options: [
      {
        text: 'Recommencer',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'Tu parviens rapidement à crier "KATON LA BOULE DE FEU SUPREME"\n. Une boule de feu jaillit, les voyous brûlent et s enfuient',
    options: [
      {
        text: 'Continuer ton périple',
        nextText: 12
      }
    ]
  },
  {
    id: 11,
    text: 'Tu donne aux vouyous ton morceau de métal et ils te laissent tranquille',
    options: [
      {
        text: 'Continuer ton périple',
        nextText: 12
      }
    ]
  },
  {
    id: 12,
    text: 'Hâletant et fatigé tu te dirige vers ce qui te semble être un temple',
    options: [
        {
          text: 'S approcher du bâtiment',
          nextText: 13
        },
        {
          text: 'Aller voir un garde',
          nextText: 14
        },
      ]
  },
  {
      id: 13, 
      text: 'Tu t approche et un garde ainsi qu une personne avec un badge ou il est écrit "NAROUTE" t interpellent',
      options: [
        {
            text: 'Les prévenir que leurs ville n est pas sûre',
            nextText: 15
        },
        {
            text: 'Demander où tu es',
            nextText: 16
        }
      ]
      
  },
  {
    id: 14,
    text: 'Tu t approche d un garde vêtu d un equipement qui semble fait pour le combat ainsi que d un bandeau avec une plaque de métal et un signe bizarre dessus',
    options: [
        {
            text: 'Lui demander où tu es',
            nextText: 16
        },
        {
            text: 'Lui dire que la ville n est pas sûre',
            nextText: 17
        }
    ]
  },
  {
      id: 15,
      text: 'Ils s enervent et veulent t emprisonner',
      options:[
          {
              text: 's excuser platement (recommencer la rencontre)',
              nextText: 13
          }
      ]
      
  },
  {
    id: 16,
    text: 'Tu es à konohax le village caché des feuilles, décline ton identité',
    options:[
        {
            text: 'Donner son identité',
            nextText: 19
        },
        {
          text: 'Refuser de donner son identité',
          nextText: 17
      }
    ]
    
  },
  {
    id: 17,
    text: 'Capturez Le',
    options:[
        {
            text: 'Tu es soupçonné d espionnage et est emprisonné ',
            nextText: -1
        },
    ]
    
  },
  {
    id: 18,
    text: 'Que s est il passé?',
    options:[
        {
            text: 'Raconter la rencontre avec les bandits',
            nextText: 20
        },
        {
          text: 'S excuser et dire que cela n a pas d importance',
          nextText: 21
      }
    ]
    
  },
  {
    id: 19,
    text: 'Tu t apelle Ritisus ?\n Pas commun comme nom\n Que fait tu ici?',
    options:[
        {
            text: 'Raconter son histoire',
            nextText: 22
        },
        {
          text: 'Refuser de raconter',
          nextText: 17
      },
    ]
    
  },
  {
    id: 20,
    text: 'Un étranger qui à réussi à maitriser cette technique, impressionnant.\n Que dirait tu de rentrer dans la garde?',
    options:[
        {
            text: 'Accepter',
            nextText: 23
        },
        {
          text: 'Refuser',
          nextText: 17
      }
    ]
    
  },
  {
    id: 21,
    text: 'Ok comme tu préfère',
    options:[
        {
            text: 'Demander ou tu es',
            nextText: 16
        },
            ]
    
  },
  {
    id: 22,
    text: 'Oh tu semble avoir du potentiel. \n Que dirais tu d entrer dans la garde',
    options:[
      {
        text: 'Accepter',
        nextText: 23
    },
    {
      text: 'Refuser',
      nextText: 24
    }
         ]
    
  },
  {
    id: 23,
    text: '*Tu passe quelques années dans la garde.\n Ton efficacité est enfin récompensée\n On te propose deux choix',
    options:[
      {
        text: 'Devenir chef de la garde',
        nextText: 25
    },
    {
      text: 'Rentrer chez les services secret du village',
      nextText: 26
    }
         ]
    
  },
  {
    id: 24,
    text: 'Tu oses refuser cette opportunité tu es forcément un ennemie',
    options:[
      {
        text: 'Ils t emprisonnent',
        nextText: -1
      }
            ]
    
  },
  {
    id: 25,
    text: 'Tu coule des jours paisible en défendant le village et Fonde une famille',
    options:[
      {
        text: 'Félicitation tu as gagné (Recommencer ?)',
        nextText: -1
      }
            ]
    
  },
  {
    id: 26,
    text: 'On te propose une mission d espionnage',
    options:[
      {
        text: 'Accepter',
        nextText: 27
      },
      {
        text: 'Refuser',
        nextText: 25
      }
            ]
    
  },
  {
    id: 27,
    text: 'Tu te fais capturer lors d une mission d espionnage\n Ils te demandent de livrer les secret du village',
    options:[
      {
        text: 'Parler',
        nextText: 28
      },
      {
        text: 'Refuser de parler',
        nextText: 29
      }
            ]
    
  },
  {
    id: 28,
    text: 'Tu décide de parler\n Après avoir délivrer les secret du village ils n ont plus besoin de toi et te torturent a mort',
    options:[
      {
        text: 'Fin',
        nextText: -1
      },
            ]
    
  },
  {
    id: 29,
    text: 'Ils te torturent et te laissent pour mort\n Une expédition du village arrivent et te porte secours',
    options:[
      {
        text: 'Revenir au village',
        nextText: 30
      },
            ]
    
  },
  {
    id: 30,
    text: 'Tu rentre au village on te soigne et tu termine t es vieux jours en héros pour ne pas avoir vendu le village à l ennemie',
    options:[
      {
        text: 'Felicitation (Recommencer?)',
        nextText: -1
      }
            ]
    
  },
]

startGame()
