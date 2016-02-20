require 'erb'
require 'kramdown'

index = -1
markdowns = []

File.read("slide.md", :encoding => Encoding::UTF_8).each_line do |line|
  if line =~ /^#[^#]/
    index = index + 1
    markdowns << ""
  end
  markdowns[index] << line
end

slides = ""

markdowns.each do |md|
  slides << "<section>\n"
  slides << Kramdown::Document.new(md, { auto_ids: false }).to_html
  slides << "</section>\n"
end

template = <<EOS
<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="css/slide.css">
    <link rel="stylesheet" href="css/theme.css">
    <script src="js/slide.js"></script>
  </head>
  <body>
<%= slides %>
  </body>
</html>
EOS

puts ERB.new(template).run
