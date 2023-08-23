const EditModal = ({
  editingItem,
  setEditingItem,
  setShowEdit,
  updateItem,
  setChangeTheme,
  changeTheme,
}) => {
  return (
    <div className="delete-modal">
      <div
        className={changeTheme ? "modal-inner bg-dark" : "modal-inner bg-light"}
      >
        <h5 className={changeTheme ? "text-light" : "text-dark"}>
          Kitap ismini düzenle
        </h5>

        <input
          value={editingItem.title}
          className="form-control shadow"
          type="text"
          // elemanın düzenlenmiş ismini app.js deki state gönderme
          onChange={(e) =>
            setEditingItem({
              ...editingItem,
              title: e.target.value,
              date: new Date(),
            })
          }
        />
        <div className="d-flex justify-content-between mt-4 gap-3">
          <button
            onClick={() => setShowEdit(false)}
            className="btn btn-warning w-50"
          >
            Vazgeç
          </button>
          <button onClick={() => updateItem()} className="btn btn-success w-50">
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditModal;
