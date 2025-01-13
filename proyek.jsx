const getData = () => {
 return [
   {
     id: 1,
     name: 'Abd Rahim Alkautsar',
     tag: 'FullStackDev',
     imageUrl: '/images/rahim.jpg',
   },
   {
     id: 2,
     name: 'Yanto Cukurukuk',
     tag: 'Yanto',
     imageUrl: '/images/yanto.jpeg',
   },
 ];
}

function DeleteButton({ id, onDelete }) {
  return <button className='contact-item__delete' onClick={() => onDelete(id)}>X</button>
}

function ContactItemBody({ name, tag }) {
 return (
   <div className="contact-item__body">
     <h3 className="contact-item__title">{name}</h3>
     <p className="contact-item__username">@{tag}</p>
   </div>
 );
}

function ContactItemImage ({ imageUrl }) {
  return (
    <div className="contact-item__image">
      <img src = {imageUrl} alt="contact avatar" />
    </div>
    );
}

function ContactItem({imageUrl, name, tag, id, onDelete }) {
  return(
    <div className='contact-item'>
      <ContactItemImage imageUrl={imageUrl}/>
      <ContactItemBody name={name} tag={tag}/>
      <DeleteButton id={id} onDelete={onDelete}/>
    </div>);
}


function ContactList({ contacts, onDelete }) {
 return (
   <div className="contact-list">
      {
        contacts.map((contact) => (
          <ContactItem 
          key={contact.id}
          id={contact.id}
          onDelete={onDelete}
          {...contact} />
        ))
      }
    </div>
 );
}

class ContactApp extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     contacts: getData(),
   }
 
   this.onDeleteHandler = this.onDeleteHandler.bind(this);
   this.onAddContactHandler = this.onAddContactHandler.bind(this);
 }
 
 onDeleteHandler(id) {
   const contacts = this.state.contacts.filter(contact => contact.id !== id);
   this.setState({ contacts });
 }
 onAddContactHandler({ name, tag }) {
   this.setState((prevState) => {
     return {
       contacts: [
         ...prevState.contacts,
         {
           id: +new Date(),
           name,
           tag,
           imageUrl: '/images/cat.jpeg',
         }
       ]
     }
   });
 }
 
 render() {
   return (
     <div className="contact-app">
       <h1>Aplikasi Kontak</h1>
       <h2>Tambah Kontak</h2>
       <ContactInput addContact={this.onAddContactHandler} />
       <h2>Daftar Kontak</h2>
       <ContactList contacts={this.state.contacts} onDelete={this.onDeleteHandler} />
     </div>
   );
 }
}

class ContactInput extends React.Component {
  constructor(props) {
   super(props);
 
   this.state = {
     name: '',
     tag: '',
   }
 
   this.onNameChangeEventHandler = this.onNameChangeEventHandler.bind(this);
   this.onTagChangeEventHandler = this.onTagChangeEventHandler.bind(this);
   this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
 }
 onNameChangeEventHandler(event) {
   this.setState(() => {
     return {
       name: event.target.value,
     }
   });
 }
 
 onTagChangeEventHandler(event) {
   this.setState(() => {
     return {
       tag: event.target.value,
     }
   });
 }

onSubmitEventHandler(event) {
  event.preventDefault();
  this.props.addContact(this.state);
}
  
  
   render() {
     return(
     <form className='contact-input' onSubmit={this.onSubmitEventHandler}>
       <input type="text" placeholder="Nama" value={this.state.name} onChange={this.onNameChangeEventHandler} />
       <input type="text" placeholder="Id" value={this.state.tag} onChange={this.onTagChangeEventHandler} />
       <button type="submit">Tambah</button>
     </form>
       )
   }
 }
 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ContactApp />)
