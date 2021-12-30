import React, { useEffect } from 'react'
// import download from 'downloadjs'
import { PDFDocument } from 'pdf-lib'
import pdfFile from '../../Picture/Blue.pdf'

const PdfGenerater = () => {



    const generater = async (name) => {
        // const {PDFDocument, rgba} = PDFLib;


        const exPdf = await fetch(pdfFile).then((res) => {
            return res.arrayBuffer()
        })

        const pdfDoc = await PDFDocument.load(exPdf);

        const page = pdfDoc.getPages()

        const firstPage = page[0];
        firstPage.drawText(name, {
            x:300,
            y:270
        }

        )

        const uri = await pdfDoc.saveAsBase64({ dataUri: true })


        

        // const pdfBytes = await pdfDoc.save()

        // download(pdfBytes, "pdf-lib.pdf", "application/pdf");



        document.querySelector("#mypdf").src = uri;
    }

    useEffect(() => {
        generater("Rohit");
    }, [])


    return (
        <div>
            {/* <button onClick={generater}>for pdf</button> */}
            {/* <h1>ye mere pdf</h1> */}
            <iframe src="" id="mypdf" title="my PDF" style={{ width: '500px', height: "500px" }}></iframe>
        </div>
    )
}

export default PdfGenerater
