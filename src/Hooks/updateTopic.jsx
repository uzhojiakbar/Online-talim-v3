import { instance } from './api'

function updateTopic() {

  const updateFunctons = async (nomi, topicName, updateData) => {
    try {
      const response = await instance.put(`/api/topic/${nomi}/${topicName}`, updateData)
      window.location.reload()
    } catch (err) {
      console.log("Malumotlarni yangilashda xatolik", err)
    }
  }
  return ({ updateFunctons })
}

export default updateTopic