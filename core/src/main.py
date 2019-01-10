'''
    main.py

    @author Daquaris Chadwick
    
    The main entry point
'''
import argparse
import learn.outfitter_model as OModel

parser = argparse.ArgumentParser(description='Parse model state')
parser.add_argument('-t', '--train', action='store_true', help='Train model flag')
args = parser.parse_args()

model = OModel.OutfitterModel()
model.train(model.train_images, model.train_labels)
model.test()

'''
if args.train:
    model = train_clothing_predictor(train_images, train_labels)
    model.save('clothing_pred.h5')
else:
    try:
        model = keras.models.load_model('./clothing_pred.h5')
        model.compile(optimizer=tf.train.AdamOptimizer(),
            loss='sparse_categorical_crossentropy',
            metrics=['accuracy']
        )
    except Exception as err:
        print('ERROR: Model Retrieval Error: {}'.format(err))
        exit()
'''