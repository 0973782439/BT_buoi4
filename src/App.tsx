import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import Button from "./components/Button";
import Card from "./components/Card";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { CommonActions } from "./app/Redux/CommonSlices";
import { RootState } from "./app/store";
import { IAlbum } from "./interface/IAlbum";
import Loading from "./components/Loading";
function App() {
  // const [valueEdit, setValueEdit] = useState<IAlbum>();
  const [limit, setLimit] = useState(1);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState<any>({});
  const [selectedPhotoId, setSelectedPhotoId] = useState<any>(new Set());

  const dispatch = useAppDispatch();
  const dataAlbum = useAppSelector(
    (state: RootState) => state.common.dataAlbum
  );
  const handleEdit = (id: number, title: string) => {
    setIsEditing(true);
    setEditedTitle({ ...editedTitle, [id]: title });
    setSelectedPhotoId(new Set(selectedPhotoId.add(id)));
  };

  const handleSave = () => {
    selectedPhotoId.forEach((id: number) => {
      dispatch(CommonActions.updateData({ id, title: editedTitle[id] }));
    });
    setEditedTitle({});
    setSelectedPhotoId(new Set());
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle({});
    setSelectedPhotoId(new Set());
  };

  const handleReset = () => {
    // setIsEditing(false);
  };

  const handleTitleChange = useCallback(
    (e: any, id: number) => {
      setIsEditing(true);
      setEditedTitle({ ...editedTitle, [id]: e.target.value });
    },
    [editedTitle]
  );
  //
  const handleLoadMoreData = () => setLimit((prev) => prev + 1);
  useEffect(() => {
    dispatch(CommonActions.fetchData(limit));
  }, [dispatch, limit]);
  const loadingRef = useRef<any>(null);
  const onIntersection = useCallback(
    (entries: any) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting) {
        handleLoadMoreData();
        console.log("func:onInter");
      }
    },
    [dataAlbum]
  ); // de:dataAlbum
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);
    if (observer && loadingRef.current) {
      observer.observe(loadingRef.current);
      console.log("func gọi lại api ");
    }
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [dataAlbum]);

  return (
    <div>
      <Button
        handleSave={handleSave}
        handleCancel={handleCancel}
        isEditing={isEditing}
      />
      <Card
        editedTitle={editedTitle}
        handleEdit={handleEdit}
        selectedPhotoId={selectedPhotoId}
        handleTitleChange={handleTitleChange}
        dataAlbum={dataAlbum}
        handleReset={handleReset}
        isEditing={isEditing}
      />
      <Loading loadingRef={loadingRef}></Loading>
    </div>
  );
}

export default App;
