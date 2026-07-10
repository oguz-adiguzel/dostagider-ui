import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

const page = () => {
  return (
    <div className="container mx-auto">
      <p className="text-center mt-10 text-3xl font-semibold font-sans">
        Genel
      </p>
      <div className="w-1/2 mx-auto mt-8">
        <Accordion
          elevation={0}
          sx={{
            backgroundColor: "#F9FBFC",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <p className="font-semibold font-sans">
              İnternette gördüğüm arabaların sahibi Dostagider.com mu yoksa
              başkaları mı?
            </p>
          </AccordionSummary>
          <AccordionDetails className="text-sm text-gray-600 font-sans">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion
          elevation={0}
          sx={{
            backgroundColor: "#F9FBFC",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <p className="font-semibold font-sans">
              Sattığınız arabaları nasıl seçiyorsunuz?
            </p>
          </AccordionSummary>
          <AccordionDetails className="text-sm text-gray-600 font-sans">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion
          elevation={0}
          sx={{
            backgroundColor: "#F9FBFC",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <p className="font-semibold font-sans">
              Favori arabalarımı daha sonra görebileceğim bir listeye
              kaydedebilir miyim?
            </p>
          </AccordionSummary>
          <AccordionDetails className="text-sm text-gray-600 font-sans">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion
          elevation={0}
          sx={{
            backgroundColor: "#F9FBFC",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <p className="font-semibold font-sans">
              Beğendiğim araçlar envanterinize eklendiğinde bildirim alabilir
              miyim?{" "}
            </p>
          </AccordionSummary>
          <AccordionDetails className="text-sm text-gray-600 font-sans">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion
          elevation={0}
          sx={{
            backgroundColor: "#F9FBFC",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <p className="font-semibold font-sans">
              Bana ve bütçeme uygun doğru arabayı bulmamda yardımcı olacak hangi
              araçlara sahipsiniz?
            </p>
          </AccordionSummary>
          <AccordionDetails className="text-sm text-gray-600 font-sans">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
      </div>

      <p className="text-center mt-32 text-3xl font-semibold font-sans ">
        Ödemeler
      </p>
      <div className="w-1/2 mx-auto mt-8">
        <Accordion
          elevation={0}
          sx={{
            backgroundColor: "#F9FBFC",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <p className="font-semibold font-sans">
              İnternette gördüğüm arabaların sahibi Dostagider.com mu yoksa
              başkaları mı?
            </p>
          </AccordionSummary>
          <AccordionDetails className="text-sm text-gray-600 font-sans">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion
          elevation={0}
          sx={{
            backgroundColor: "#F9FBFC",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <p className="font-semibold font-sans">
              Sattığınız arabaları nasıl seçiyorsunuz?
            </p>
          </AccordionSummary>
          <AccordionDetails className="text-sm text-gray-600 font-sans">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion
          elevation={0}
          sx={{
            backgroundColor: "#F9FBFC",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <p className="font-semibold font-sans">
              Favori arabalarımı daha sonra görebileceğim bir listeye
              kaydedebilir miyim?
            </p>
          </AccordionSummary>
          <AccordionDetails className="text-sm text-gray-600 font-sans">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion
          elevation={0}
          sx={{
            backgroundColor: "#F9FBFC",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <p className="font-semibold font-sans">
              Beğendiğim araçlar envanterinize eklendiğinde bildirim alabilir
              miyim?{" "}
            </p>
          </AccordionSummary>
          <AccordionDetails className="text-sm text-gray-600 font-sans">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion
          elevation={0}
          sx={{
            backgroundColor: "#F9FBFC",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <p className="font-semibold font-sans">
              Bana ve bütçeme uygun doğru arabayı bulmamda yardımcı olacak hangi
              araçlara sahipsiniz?
            </p>
          </AccordionSummary>
          <AccordionDetails className="text-sm text-gray-600 font-sans">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
      </div>

      <p className="text-center mt-32 text-3xl font-semibold font-sans ">
        Kurumsal
      </p>
      <div className="w-1/2 mx-auto mt-8 mb-10">
        <Accordion
          elevation={0}
          sx={{
            backgroundColor: "#F9FBFC",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <p className="font-semibold font-sans">
              İnternette gördüğüm arabaların sahibi Dostagider.com mu yoksa
              başkaları mı?
            </p>
          </AccordionSummary>
          <AccordionDetails className="text-sm text-gray-600 font-sans">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion
          elevation={0}
          sx={{
            backgroundColor: "#F9FBFC",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <p className="font-semibold font-sans">
              Sattığınız arabaları nasıl seçiyorsunuz?
            </p>
          </AccordionSummary>
          <AccordionDetails className="text-sm text-gray-600 font-sans">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion
          elevation={0}
          sx={{
            backgroundColor: "#F9FBFC",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <p className="font-semibold font-sans">
              Favori arabalarımı daha sonra görebileceğim bir listeye
              kaydedebilir miyim?
            </p>
          </AccordionSummary>
          <AccordionDetails className="text-sm text-gray-600 font-sans">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion
          elevation={0}
          sx={{
            backgroundColor: "#F9FBFC",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <p className="font-semibold font-sans">
              Beğendiğim araçlar envanterinize eklendiğinde bildirim alabilir
              miyim?{" "}
            </p>
          </AccordionSummary>
          <AccordionDetails className="text-sm text-gray-600 font-sans">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion
          elevation={0}
          sx={{
            backgroundColor: "#F9FBFC",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <p className="font-semibold font-sans">
              Bana ve bütçeme uygun doğru arabayı bulmamda yardımcı olacak hangi
              araçlara sahipsiniz?
            </p>
          </AccordionSummary>
          <AccordionDetails className="text-sm text-gray-600 font-sans">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default page;
