class UserName extends HTMLElement{
    constructor(){
        super();
        this.innerHTML = `
            <style>
                h1{
                    color: gray;
                }
            </style>
            <h1>
                ${this.getAttribute('name')}
            </h1>
        `;
    }
}

window.customElements.define('user-name', UserName)


const template = document.createElement('template')

template.innerHTML = `
    <style>

        .user-card{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            background: #f4f4f4;
            width: 40%;
            display: grid;
            grid-template-columns: 1fr 2fr;
            grid-gap: 10px;
            margin-bottom: 15px;
            border-bottom: darkorchid 5px solid;
        }

        .user-card img{
            width: 100%
        }
        
        .user-card > .details{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
        }

        h1{
            color: coral
        }

        .user-card button{
            cursor: pointer;
            background: darkorchid;
            color: #fff;
            border: 0;
            border-radius: 5px;
            padding: 5px 10px;
            outline: none;
        }

    </style>
    <div class='user-card'>
        <img/>
        <div class='details'>
            <h1>
                Ikem
            </h1>
            <div class='contact'>
                <p>
                    <slot name='email'>
                </p>
                <p>
                    <slot name='phone' />
                </p>
            </div>
            <button id='toggle'>Hide Contact</button>
        </div>
    </div>
`


class UserCard extends HTMLElement{
    constructor(){
        super();

        this.showDetails = true;

        this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('h1').innerText = this.getAttribute('name');
        this.shadowRoot.querySelector('img').src = this.getAttribute('avatar')
    }

    toggleDetails(){
        this.showDetails = !this.showDetails;

        const contact = this.shadowRoot.querySelector('.contact');
        const toggle = this.shadowRoot.querySelector('button');

        if(this.showDetails){
            contact.style.display = 'none';
            toggle.innerText = 'Show Contact';
        } else{
            contact.style.display = 'block';
            toggle.innerText = 'Hide Contact'
        }
        
    }

    connectedCallback(){
        this.shadowRoot.querySelector('button').
        addEventListener('click', ()=> this.toggleDetails())
    }

    disconnectedCallback(){
        this.shadowRoot.querySelector('button').
        removeEventListener();
    }
}

window.customElements.define('user-card', UserCard)