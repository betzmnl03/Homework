# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Comment.delete_all
Post.delete_all
User.delete_all


NUM_POSTS = 50
NUM_USERS=10

PASSWORD='supersecret'
super_user= User.create(
    name: 'Jon Snow',
    email: 'js@winterfell.gov',
    password: PASSWORD,
    is_admin: true
)

NUM_USERS.times do
    first_name= Faker::Name.first_name
    last_name = Faker::Name.last_name
    name="#{first_name} #{last_name}"
    User.create(
        name: name,
        email: "#{first_name}.#{last_name}@example.com",
        password: PASSWORD
        
    )
end
users=User.all

NUM_POSTS.times do
    created_at = Faker::Date.backward(days: 365*5) 
    p=Post.create(
        title: Faker::Lorem.sentence(word_count: 3),
        body:Faker::Lorem.sentence(word_count: 100),
        created_at: created_at, 
        updated_at: created_at,
        user: users.sample
    )
    if p.valid?

        p.comments = rand(2..10).times.map do
            Comment.new(
                body: Faker::TvShows::GameOfThrones.quote,
                created_at: Faker::Date.between(from: created_at, to: Date.today),
                user: users.sample
        )
        
        end
    puts p.errors.full_messages
    end
end

posts = Post.all
comments = Comment.all

puts Cowsay.say("Generated #{posts.count} posts", :dragon)
puts Cowsay.say("Generated #{comments.count} comments", :frogs)
puts Cowsay.say("Generated #{users.count} users.",:beavis)
