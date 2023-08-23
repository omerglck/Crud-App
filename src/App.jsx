import { v4 as pass } from "uuid";
import { useState } from "react";
import BookCard from "./components/BookCard";
import DeleteModal from "./components/DeleteModal";
import EditModal from "./components/EditModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [books, setBooks] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [changeTheme, setChangeThem] = useState(true);
  //* Formun gönderilme olayı
  const handleSubmit = (e) => {
    e.preventDefault();
    // Kitap ismine event ile erişme
    const title = e.target[0].value;
    if (!title) {
      toast.warn("Kitap ismi giriniz.", { autoClose: 2000 });
      return;
    }
    //! Kitap objesi
    const newBook = {
      id: pass(),
      title,
      date: new Date(),
      isRead: false,
    };
    //todo Oluşturulan objeyi kitaplar dizisine aktarmak için iki yöntemden birini kullanabiliriz
    // setBooks([...books, newBook]);
    setBooks([newBook, ...books]);
    console.log(books);

    // Input'u temizleme
    e.target[0].value = "";
    // Bildirim verme
    toast.success("Kitap başarıyla eklendi.", { autoClose: 2500 });
  };

  //* Silme modal'ı için fonksiyon
  const handleModal = (id) => {
    //todo modal'ı açar
    setShowDelete(true);
    console.log(id);
    //todo Silincek elemanın id'sini state'e aktarma
    setDeleteId(id);
  };

  //* Silme işlemi
  const handleDelete = () => {
    //todo Elemanı bildiğimiz elamanı diziden çıkarma
    const filtred = books.filter((book) => book.id !== deleteId);
    console.log(deleteId);
    //todo State'i güncelleme
    setBooks(filtred);
    //todo Modal'ı kapat
    setShowDelete(false);
    //todo Bildirim verme
    toast.error("Kitap başarıyla silindi.", { autoClose: 2500 });
  };

  //* Okundu işleminde çalışır
  const handleRead = (editItem) => {
    // Diziden bir elemanı güncelleme
    //todo Okundu değerini tersine çevirme
    const updated = { ...editItem, isRead: !editItem.isRead };
    console.log(updated);
    // //todo State'in kopyasını alma
    // const clone = [...books];
    // //todo Düzenlenecek elemanın sırasını bulma
    // const index = books.findIndex((book) => book.id === updated.id);
    // //todo Clone diziyi güncelleme
    // clone[index] = updated;
    // //todo State'i güncelleme

    // Map
    const newBooks = books.map((item) =>
      item.id !== updated.id ? item : updated
    );
    setBooks(newBooks);
  };

  //* edit modal işlemleri
  const handleEditModal = (item) => {
    //modal'ı açar
    setShowEdit(true);
    //düzenlenecek elemanı state'e aktarma
    setEditingItem(item);
  };
  //* elemanı düzenleme
  const updateItem = () => {
    // kitaplar dizisindeki bir elemanı güncelleme
    // kitaplar dizisini dön
    // eleman düzenlenecek eleman değilse onu olduğu gibi yeni diziye aktar
    // eleman düzenlenecek olan ise güncel halini diziye aktar
    const newBooks = books.map((book) =>
      book.id !== editingItem.id ? book : editingItem
    );
    // state'i güncelleme
    setBooks(newBooks);
    // modal'ı kapatır
    setShowEdit(false);
    console.log("Güncel Hali:", editingItem);
    // bildirim verme
    toast.info("Kitap ismi düzenlendi", { autoClose: 2000 });
  };
  //* diziyi temizleme
  const clearBook = () => {
    setBooks([]);
  };

  return (
    <div className="App">
      <div
        className={
          changeTheme ? "bg-dark text-light w-100" : "bg-light text-dark w-100"
        }
      >
        <header className="bg-dark text-center text-light py-2 fs-5 d-flex justify-content-around align-items-center">
          <h1>Kitap Kurdu</h1>
          <div>
            <button
              onClick={() => {
                changeTheme ? setChangeThem(false) : setChangeThem(true);
              }}
              className="btn btn-light"
            >
              {changeTheme ? "Açık Mod" : "Koyu Mod"}
            </button>
          </div>
        </header>
        <main className="container">
          {/* form */}
          <form onSubmit={handleSubmit} className="d-flex gap-3 p-4 mt-4">
            <input
              className="form-control shadow "
              type="text"
              placeholder="Bir kitap ismi giriniz!"
            />
            <button className="btn btn-warning shadow">Ekle</button>
            <button
              onClick={() => clearBook()}
              className="btn btn-danger shadow"
            >
              Temizle
            </button>
          </form>

          {/* Kitaplar dizisi boş ise */}
          {books.length === 0 && (
            <h4 className="text-center p-2 border border-secondary m-4 my-3 w-50 m-auto rounded shadow">
              Henüz kitap eklenmedi.
            </h4>
          )}
          {/* Kitaplar dizisi dolu ise */}
          {books.map((book) => (
            <BookCard
              key={book.id}
              data={book}
              handleModal={handleModal}
              handleRead={handleRead}
              handleEditModal={handleEditModal}
            />
          ))}
        </main>

        {/* Modal */}
        {showDelete && (
          <DeleteModal
            setShowDelete={setShowDelete}
            handleDelete={handleDelete}
            setChangeThem={setChangeThem}
            changeTheme={changeTheme}
          />
        )}
        {showEdit && (
          <EditModal
            setShowEdit={setShowEdit}
            setEditingItem={setEditingItem}
            editingItem={editingItem}
            updateItem={updateItem}
            setChangeThem={setChangeThem}
            changeTheme={changeTheme}
          />
        )}

        {/* Bildirimler için */}
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
