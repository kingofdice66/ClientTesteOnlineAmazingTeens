import React from "react";
//-----------------------------------------------------------
import { Editor } from "@tinymce/tinymce-react";
import "tinymce/tinymce";
import "tinymce/icons/default";
import "tinymce/themes/silver";
import "tinymce/plugins/paste";
import "tinymce/plugins/link";
import "tinymce/plugins/image";
import "tinymce/plugins/table";
import "tinymce/plugins/autolink/plugin";
import "tinymce/plugins/media/plugin";
import "tinymce/plugins/insertdatetime/plugin";
import "tinymce/plugins/help/plugin";
import "tinymce/plugins/advlist/plugin";
import "tinymce/plugins/lists/plugin";
import "tinymce/plugins/visualblocks/plugin";
import "tinymce/plugins/code/plugin";
import "tinymce/plugins/fullscreen/plugin";
import "tinymce/plugins/searchreplace/plugin";
import "tinymce/plugins/charmap/plugin";
import "tinymce/plugins/anchor/plugin";
import "tinymce/plugins/wordcount/plugin";
import "tinymce/skins/ui/oxide/skin.min.css";
import "tinymce/skins/ui/oxide/content.min.css";
import "tinymce/skins/content/default/content.min.css";
//-----------------------------------------------------------

function TinyMCE(): JSX.Element {
    return (
        <Editor
            init={{
                width: "100%",
                skin: false, // so it can get the skins downloaded from the packages
                // eslint-disable-next-line camelcase
                content_css: false, // so it can get the skins downloaded from the packages
                height: 250,
                menubar: true,
                branding: false,
                contextmenu: false,
                // eslint-disable-next-line camelcase
                browser_spellcheck: true,
                // eslint-disable-next-line camelcase
                content_style: "p {margin: 0}", // 'content_style: "p {margin: 0}"' eliminate spacing between paragraphs.
                mobile: {
                    menubar: true,
                },
                plugins: [
                    "advlist autolink lists link image charmap anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                ],
                toolbar: `
            undo redo | formatselect | bold italic backcolor |
            alignleft aligncenter alignright alignjustify |
            bullist numlist outdent indent | removeformat | help`,
            }}
        />
    );
}

export default TinyMCE;
