import { setDoc, doc } from "firebase/firestore";
const express = require('express')
const app = express()

app.put('/api/reservate', async (req, res) => {
    const savedate = req.body.setDate;
    const reservateData = req.body.reservateData;
    await setDoc(doc(this.$db, "reservate", savedate), {
        [reservateData]: {
          time: req.body.editedItem.time,
          name: req.body.editedItem.name,
          ssnum: req.body.editedItem.ssnum,
          telnum: req.body.editedItem.telnum,
          first: req.body.editedItem.first,
          wi: req.body.editedItem.wi,
          dae: req.body.editedItem.dae,
          yu: req.body.editedItem.yu,
          ja: req.body.editedItem.ja,
          gan: req.body.editedItem.gan,
          gfs: req.body.editedItem.gfs,
          cfs: req.body.editedItem.cfs,
          sleep: req.body.editedItem.sleep,
          live: req.body.editedItem.live,
          memo: req.body.editedItem.memo
        }
      }, { merge: true });
})

module.exports = app